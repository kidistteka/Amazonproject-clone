import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/Endpoint'
import Loader from '../../Components/Loader/Loader'

function Results() {
    const[results, setResults]= useState([])
    const[ isLoading, setIsLoading]=useState(false)
    const {categoryName}=useParams()
    useEffect(()=> {
        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res)=>{
            setResults(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false);
        })

    }, [])
   
    
  return (
    <Layout>
      <section>
         <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
         <hr />
         {isLoading?(<Loader/>):( <div className={classes.products_container}>
           {results?.map((product) => (
             <ProductCard
          key={product.id}
          product={product}
          renderDesc={false}
          renderAdd={true}
              />
            ))}
           </div>
          )}
     </section>
    
    </Layout>
  )
}

export default Results
