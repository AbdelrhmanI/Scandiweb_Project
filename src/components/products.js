import React from "react";
import "../style/content.css"
import axios from "axios"
import { useState,useEffect } from "react";
import Header from "./header"
import Footer from "./footer"

const Products = (()=>{
    const [item,setItem]=useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/php-project/fetch.php");
        const result = await response.json();
        setItem(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleCheckboxChange = (sku) => {
         // Check if the SKU is already in the checkedItems array
         const isChecked = checkedItems.includes(sku);
         // If it's checked, remove it; otherwise, add it to the array
         const updatedCheckedItems = isChecked
             ? checkedItems.filter((itemSku) => itemSku !== sku)
             : [...checkedItems, sku];
 
         // Update the state with the new checked items array
         setCheckedItems(updatedCheckedItems);
         console.log("Selected SKUs:", updatedCheckedItems);
      };

      const handleDelete = () => {
        axios.post("http://localhost/php-project/delete.php", { 
        itemSkus: checkedItems,
      }).then((response) => {
        console.log(response.data);
        // Refresh the items list after deletion
        fetchData();
        // Clear the checkedItems array after successful deletion
        setCheckedItems([]);
      }).catch((error) => {
        console.error("Error deleting items:", error);
      });
      };
    const boxElements=item.map(things=>(
        <div className="div-box" key={things.sku}>     
            <input 
          type="checkbox"
          className="delete-checkbox"
          checked={checkedItems.includes(things.sku)}
          onChange={() => handleCheckboxChange(things.sku)}
            />
            <div className="div-content">
                <label className="SKU">{things.sku}</label>
                <label className="Name">{things.name}</label>
                <label className="Price">{things.price} $</label>
                <label className="size">{things.size}</label>
            </div>
    </div>
    ))
  return(
    <div>
      <Header path2={'/AddItem'} onClickHandle={handleDelete} btn={'MASS DELETE'} btn2={'ADD'} htext={'Product List'}/>
      <div>{boxElements}</div> 
      <Footer/>
    </div>
    )}
)
export default Products;