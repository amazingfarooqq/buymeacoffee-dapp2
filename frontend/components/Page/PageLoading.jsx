import React from 'react'

const PageLoading = () => {
  return (
    <div className="container">
        <div className="row mt-5 px-xl-5 mx-xl-5">
        
        <div className="col-lg-12 p-4 bg-light rounded text-start">
            <div className=' '>
            <h1 className="card-title placeholder-glow">
                <span className="rounded placeholder col-3"></span>
            </h1>
            <p className='placeholder-glow rounded'> <span className='placeholder col-3 rounded'>0</span> </p>
            <p className='placeholder-glow rounded'> <span className='placeholder col-2 rounded'>0</span> </p>
            <button className="btn btn-danger m-1 px-4 rounded-pill fs-5">Loading Member....</button>

            </div>
        </div>


        <div className="col-lg-8 mt-3 p-4 bg-light border rounded">
            Loading Contributers
        </div>
        <div className="col-lg-4 mt-3 p-4 py-0 disabled btn mx-0" style={{border: "0px solid white"}}>
            <div className="row p-4 bg-light rounded border">
                <p className='fs-5 text-start'>Buy .... a coffee.</p>
                <input name="username"  type="text"className="form-control fs-5 p-2  m-0 border"  placeholder='Your name'/>
                <textarea name="usermessage" type="text"className="form-control fs-5 py-2 my-2  m-0 border"  placeholder='Message' style={{height: "100px"}}/>
                <button className="btn btn-warning rounded-pill fs-5 w-100 mt-2" disabled={true}>Buy Coffee</button>
            </div>                    
        </div>

        </div>
    </div>
  )
}

export default PageLoading