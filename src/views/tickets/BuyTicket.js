import React from 'react';
import swal from 'sweetalert';

import { selectAll, getSelfId, selectWithFilter, selectById } from './../../utils/apiHelper';

import './../../stylesheets/seat.css';

class BuyTicket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSeats: 0,
      availableSeats: 0,
      selectedSeats : 0
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.renderSeats= this.renderSeats.bind(this);
    this.handleSeatSelection= this.handleSeatSelection.bind(this);
    this.loadSeatsData= this.loadSeatsData.bind(this);
  }

  componentDidMount() {
    this.loadSeatsData();
  }

  loadSeatsData(){
    //Select de la id de la sala desde la id de la sesion
    let roomId = -1;
    //console.log(this.props.params);

    selectById('sessions', `${this.props.params.sessionSelectionId}`)
    .then(result =>{
      //console.log(result);
      roomId = result.idSala;
      selectById('rooms', `${roomId}`)

      .then(result =>{
        //console.log(result)
        this.setState({totalSeats: result.numeroButacas})
        //Select de los asientos libres de la sesion
        selectById('sessions', `${this.props.params.sessionSelectionId}`)

        .then(result =>{
          //console.log(result);
          this.setState({availableSeats: result.butacasLibres});
        });
      })
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.selectedSeats <= this.state.availableSeats){
      if(this.state.selectedSeats > 0){
        fetch(`http://localhost:8080/movierp/api/sessions/search/buyTicketsForSessionById?idSesion=${this.props.params.sessionSelectionId}&ticketAmount=${this.state.selectedSeats}` , {
        method: 'GET'
        })
        .then(response =>{
          this.loadSeatsData();
          swal({
            title: 'Compra realizada',
            text: `Has comprado ${this.state.selectedSeats} entradas`,
            type: 'success',
            timer: 3000
          });
        });
      } else {
        swal({
            title: 'Selecciona el número de entradas para comprar',
            text: `¡Compra alguna entrada, anda!`,
            type: 'error',
            timer: 3000
        });
      }
    } else {
        swal({
            title: 'Error en la selección de entradas',
            text: `¡No puedes comprar tantas entradas!`,
            type: 'error',
            timer: 3000
        });
    }
  }

  renderSeats() {
    //console.log("numero de sillas: " + this.state.totalSeats)
    const rows = this.state.totalSeats * 0.05;
    const columns = this.state.totalSeats / rows;
    let seats = [];
    let counter = 0;

    let occupiedSeats = this.state.totalSeats - this.state.availableSeats;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        //const isOccupied = i % 2 === 0 ? 'seat--occupied' : 'seat--free';
        //let isOccupied;
        // if((Math.random() * (this.state.totalSeats - 0) + 0) > this.state.availableSeats){
        //   isOccupied = 'seat--occupied';
        // } else {
        //   isOccupied = 'seat--free';
        // }
        let isOccupied;
        if(occupiedSeats>0){
          isOccupied = 'seat--occupied';
          occupiedSeats--;
        } else {
          isOccupied = 'seat--free';
        }
        seats.push(<span className={`seat ${isOccupied}`} key={counter}>&emsp;</span>);
        counter++;
      }
      seats.push(<br key={counter}/>);
      counter++;
    }
    return seats;
  }

  handleSeatSelection(e){
    //console.log(e.target.value)
    this.setState({selectedSeats: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>Compra de entradas</h1>

        <div className="seating">
          {this.renderSeats()}
        </div>

        <form className="FormContainer" onSubmit={this.onSubmit}>
          <h1 className="FormContainer__Title">Compra de entradas</h1>
          <div className="FormItem">
            <label htmlFor="numberOfSeats">Número de butacas a comprar</label>
            <input className="FormItem__input" name="numberOfSeats" type="number" min="0" max={this.state.seats} onChange={this.handleSeatSelection}/>
          </div>

          <div className="FormContainer__actionButton">
            <input className="btn btn--primary" type="submit" value="Comprar"/>
          </div>
        </form>
      </div>
    );
  }
}

export default BuyTicket;
