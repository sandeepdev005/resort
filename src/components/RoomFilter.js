import React from 'react'
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';
 

const getUnique = (items,value) =>{
    //does not allow duplicate value
    return [...new Set(items.map(items => items[value]))]
}


export default function RoomFilter({rooms}) {
  const context = useContext(RoomContext);
  console.log(context);

   const {handleChange,
            type,
            capacity,
            price,
            minPrice,
            maxPrice,
            minSize,
            maxSize,
            breakfast,
            pets
         } = context;

         //get unique types
         let types  = getUnique(rooms, "type");
         // add all type to the types
         types = ['all', ...types];
         // map to jsx
         types = types.map((item,index) => {
         return <option value={item} key={index}>{item}</option>
         })


         let person = getUnique(rooms,"capacity")
         person = person.map((item,index) => {
         return <option key={index} value={item}>{item}</option>
         })


    return (
        <section className="filter-container">
           <Title title="search rooms"/>
            <form className="filter-form">
                 <div className="form-group">
                    <label htmlFor="type"> Room Type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                       {types}
                    </select>
                 </div>

                {/*  Capacity */}
                 <div className="form-group">
                    <label htmlFor="capacity"> Guest</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                       {person}
                    </select>
                 </div>

                 {/* Price Range */}

                 <div className="form-group">
                    <label htmlFor="price"> Room price ${price}</label>
                    <input  className="form-control" type="range" id="price" name="price" value={price}  min={minPrice} max={maxPrice} onChange={handleChange}/>
                 </div>

                 {/* Room size range */}
                 <div className="form-group">
                    <label htmlFor="size"> Room Size</label>
                    <div className="size-inputs">
                    <input className="size-input" type="number" id="minSize"  name="minSize" value={minSize} onChange={handleChange} />
                    <input className="size-input" type="number" id="maxSize"  name="maxSize" value={maxSize} onChange={handleChange} />
                    </div>
                 </div>

                 {/* Extra */}

                 <div className="form-group">
                        <div className="single-extra">
                            <input type="checkbox" id="breakfast" name="breakfast" checked={breakfast} onChange={handleChange}/>
                            <label htmlFor="breakfast">breakfast</label>
                        </div>

                        <div className="single-extra">
                            <input type="checkbox" id="pets" name="pets" checked={pets} onChange={handleChange}/>
                            <label htmlFor="pets">pets</label>
                        </div>
                 </div>

            </form>
       
        </section>
    )
}
