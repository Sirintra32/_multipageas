import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Carts.css";

function Carts({ carts, setCarts }) {
  return (
    <div className="carts-container">
      <div className="carts-items-container">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCarts(carts.filter((c) => c.id !== cart.id));
                  }}
                >
                  Remove from cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4>
        Item: <span className="badge bg-danger">{carts.length}</span>  items - Total price: <span className="badge bg-success">$
        {carts.reduce((prev, cart) => {
          return prev + cart.price;
        }, 0).toFixed(2)}</span> 
      </h4>
      <button className="bi bi-cash-stack  btn btn-warning"> &nbsp; Checkout</button>
    </div>
  );
}

export default Carts;
