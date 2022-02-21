import { Component } from 'react';

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotation: {}
    };
  }

  componentDidMount() {
    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(
        (quotation) => {
          this.setState({
            isLoaded: true,
            quotation
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, quotation } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <p>{quotation.content}</p>
          <i>{quotation.author}</i>
        </div>
      );
    }
  }
}

export default Quotation; // Don’t forget to use export default!
