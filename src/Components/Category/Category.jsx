import React from 'react'
import { categoryInfos} from './CatagoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

function Category() {
  return (
    <section className={classes.category_container}>
       {
         categoryInfos?.map((infos) => 
            (<CategoryCard data = {infos} key={infos.id} />)
         )
      }
      
    </section>
  )
}

export default Category
