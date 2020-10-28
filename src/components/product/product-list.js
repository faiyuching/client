import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { findProduct } from "../../controllers/product";
  import ProductListCount from "./product-list-count";
  
  const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      findProduct(props.filter, props.id, props.sort).then((data) => {
        setProducts(data);
      });
    }, [props.filter, props.id, props.sort]);
    return (
      <>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <IonCard key={product._id} href={`/product/${product._id}`}>
                <IonCardHeader>
                  <IonCardSubtitle>{product.creator.username}</IonCardSubtitle>
                  <IonCardTitle>{product.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {product.content.length > 150
                    ? product.content.slice(0, 150) + "......"
                    : product.content}
                </IonCardContent>
                <productListCount
                  productId={product._id}
                  productLike={product.like.length}
                />
              </IonCard>
            );
          })
        ) : (
          <IonCard>
            <IonCardContent>no posts found</IonCardContent>
          </IonCard>
        )}
      </>
    );
  };
  
  export default ProductList;
  