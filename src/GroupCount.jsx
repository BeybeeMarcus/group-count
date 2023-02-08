import React, { useState } from "react";

function ItemForm({ addItem }) {
  const [itemName, setItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(itemName);
    setItemName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{marginTop:"5px"}}>Shopping List</h2>
      <hr/>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="  Add an Item ..."
        style={{ borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
      borderBottomLeftRadius: "20px", paddingLeft:"30px", fontSize: "20px", height:"35px", padding:"0 10px", backgroundColor: "white", color: "black"  }}
      />
      <button type="submit" style={{ marginRight: "10px", marginLeft: "20px", height: "45px", backgroundColor: "#28a745", paddingBottom: "30px" }}>Add Item</button>
    </form>
  );
}

function ItemList({ addItem }) {
  const [items, setItems] = useState([]);

  const handleAddItem = (itemName) => {
    setItems([...items, { id: items.length + 1, name: itemName, count: 1, selected: false }]);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleIncrement = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleDecrement = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setItems(newItems);
  };

  const totalCount = items.reduce((acc, item) => {
    if (!item.selected) {
      acc += item.count;
    }
    return acc;
  }, 0);

  const handleSelectItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setItems(newItems);
  };

  const InputBox = () => {
    return (
      <input type="text" style={{ textIndent: '3em', paddingLeft: '3em' }} />
    );
  };
  

  return (
    <div style={{
      margin: "20px",
      padding: "20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
      borderBottomLeftRadius: "20px",
      boxShadow: "3px 2px 18px 7px rgba(79,76,76,0.67)",
      WebkitBoxShadow: "3px 2px 18px 7px rgba(79,76,76,0.67)",
      MozBoxShadow: "3px 2px 18px 7px rgba(79,76,76,0.67)"
    }}>
      <ItemForm addItem={handleAddItem} />
      <ul className="row justify-content-start" style={{marginLeft:"0px", paddingLeft:"0px"}}>
        {items.map((item) => (
          <li key={item.id} >
            
              <input type="radio" onClick={() => handleSelectItem(item.id)} style={{ backgroundColor:"white", fontSize:"20px", height:"20px", width:"20px", marginTop:"10px", marginRight:"15px"}}/>
              {item.selected ? <s style={{marginBottom:"25px"}}>{item.name}</s> : item.name}
            
              <button className="p-3 mb-2 bg-light text-white" onClick={() => handleDeleteItem(item.id)} style={{marginLeft:"55px"}}>❌</button>
              <button onClick={() => handleDecrement(item.id)} style={{ marginLeft: "5px" }}>➖</button>
              {item.selected ? <span style={{textDecoration: 'none', marginRight:"10px"}}>{item.count}</span> : <span>{item.count}</span>}
              <button onClick={() => handleIncrement(item.id)}>➕</button>
            
          </li>
        ))}
      </ul>
      <hr/>
      <div style={{ marginLeft: "0px" }}>
        <button style={{ 
          marginRight: "20px", 
          height: "45px", 
          width: "38%",
          padding: "10px 10px", 
          backgroundColor: "#28a745", 
          borderRadius: "10px", 
          color: "#fff",
          color: "white"
         }} 
         className="checkout" >Checkout
        </button>
        <b style={{marginLeft:"50px"}}>
        Total :
        </b> 
        <b style={{ marginLeft: "10px" }}>{totalCount}
        </b>
      </div>

    </div>
  );
}



export default ItemList;