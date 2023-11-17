const Products = ({ product, addToCart }) => {
  return (
    <article className="productCard">
      <header className="productCard__header">
        <img className="productCard__image" src={product.photo} alt="" />
      </header>
      <section className="productCard__body">
        <ul className="productCard__main">
          <li>
            <h2 className="productCard__name">{product.name}</h2>
          </li>
          <li className="productCard__price">R${product.price}</li>
        </ul>
        <p className="productCard__description">{product.description}</p>
        <button className="productCard__buy" onClick={() => addToCart(product.id)}>
          COMPRAR
        </button>
      </section>
    </article>
  );
};

export default Products;