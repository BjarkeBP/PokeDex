import './App.css';
import React, { Component } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Link } from "react-router-dom";

class PokemonType extends Component {  
  render() {

    const className = `${this.props?.type?.name}-type type`

    return (
      <div className={className}>{this.props?.type?.name}</div>
    );
  }
}

class PokemonCard extends Component {
  constructor() {
    super();
    this.state = { 
      data: ''
    };
  }

  componentDidMount() {
    fetch(`${this.props.pokemonData.url}`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
      
  }

  render() {
  
    const listOftypes = this.state.data?.types?.map((index) => (
      <PokemonType key={index} type={index.type} />
    ));
  
    return (
      <Link to={`pokemon/` + this.state.data?.id}>
      <table className='pokemonCard'>
        <tbody>
          <tr>
            <td>
              #{this.state.data?.id} <br></br>           
              <div className='pokemonCardName'> {this.state.data.name} </div> 
            </td>
            <td className='pokemonPic'>
              <img src = {this.state.data?.sprites?.front_default} alt = ""></img>
            </td>
          </tr>
          <tr>
          {listOftypes}
          </tr>
        </tbody>
      </table>
      </Link>
    );
  }
}



class ArrowForth extends Component {
    render() {
      return (
        <button onClick={() => this.props.handleCount(20)}> Forth </button>
      );
    }
}

class ArrowBack extends Component {
    render() {
      return (
        <button onClick={() => this.props.handleCount(-20)}> Back </button>
      );
    }
}

class PokeDex extends Component {
  constructor() {
    super();
    this.state = { 
      count: 0,
      data: []
    };

    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const limit = 20;
    const offset = this.state.count;
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.results }));
  }

  handleCount(val) {
    if (this.state.count + val>=0 && this.state.count + val<=1008) {
      this.setState({ count: this.state.count + val }, () => {
        this.fetchData();
      }); 
    }
  }

  render() {
    const list = this.state.data.map((pokemon) => (
      <PokemonCard key={pokemon.name} pokemonData={pokemon} />
    ));
    
    return (
      <div>
        <div className='pukemonContainer'>
          {list}
        </div>
        <div className='buttonContainer'>
          <ArrowBack handleCount={this.handleCount}/>
          <ArrowForth handleCount={this.handleCount}/>
        </div>
      </div>
    );
  }
}

class About extends Component {
  constructor() {
    super();
    this.state = { 
      data: ''
    };
  }

  componentDidMount() {
    const url = window.location.href
    const id = url.split('/').pop();

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
  
    const listOftypes = this.state.data?.types?.map((index) => (
      <PokemonType key={index} type={index.type} />
    ));

    const ListOfStats= this.state.data?.stats?.map((index) => (
      <div key={index}>base_{index.stat.name}: {index.base_stat}</div>
    ));

    const ListOfAbility = this.state.data?.abilities?.map((index) => (
      <div key={index.ability.name}>{index.ability.name}</div>
    ));
    console.log(this.state.data)
    
  
    return (
      <div className='aboutContainer'>
        <table className='pokemonInfo'>
          <tbody>
            <tr>
              <td>
                #{this.state.data?.id} <br></br>           
                <div className='pokemonCardName'> {this.state.data.name} </div> 
              </td>
              <td className='pokemonPic'>
                <img src = {this.state.data?.sprites?.front_default} alt = ""></img>
              </td>
            </tr>
            <tr>
              {listOftypes}
            </tr>
            <tr>
            <div><b>Height:</b> {this.state.data?.height}</div>
            <div><b>Weight:</b> {this.state.data?.weight}</div>
            </tr>
            <tr>
            <div><b>Stats:</b></div>
              {ListOfStats}
            </tr>
            <tr>
            <div><b>Abilities:</b></div>
              {ListOfAbility}
            </tr>
          </tbody>
        </table>
      </div> 
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      router: createBrowserRouter([
        {
          path: "PokeDex/",
          element: <PokeDex />,
        },
        {
          path: "PokeDex/pokemon/:pokemonId/",
          element: <About />,
        },
      ])
    }
  }
  
  render() {
    return (
      <RouterProvider router={this.state.router} />
    );
  }
}

export default App;