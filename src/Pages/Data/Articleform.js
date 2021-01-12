import React from 'react';


const Articleform = (props) => {
    
    
    return (
        <>
            <form id="submitformforkwd" method="post" className="form-inline text-center ml-2" style={{ marginTop: "1%" }}>
                <label>Keyword: </label>
                <input value={props.searchword} className="form-control mr-sm-2" type="text" placeholder="Enter keyword"
                    name="search_keyword" id="search_keyword"
                    onChange={props.handleChange}
                />


                <label>Category: </label>

                <select name="category" id="category"
                    className="form-control"
                    value={props.category}
                    onChange={props.handleChange}
                >
                    <option value="All">All</option>
                    {props.allcats.map((item, key) => {
                        return <option key={item.id} value={item.id}>{item.category}</option>
                    })}


                </select>

                <label>Order By :</label>


                <select value = {props.stateval} className="form-control" name="orderby" id="orderby"
                    onChange={props.handleChange}
                >
                    <option value="">Choose</option>
                    <option value="oldest">Oldest</option>
                    <option value="newest">Newest</option>
                    
                </select>

                <button className="btn btn-primary" onClick={props.handleSubmit}>Search</button>
            </form>
            
            
            {/* <div className="totalrecords">TotalRecords Found: {props.foundrecords} Of {props.totalrecords}</div> */}
        </>
    );
}

export default Articleform;