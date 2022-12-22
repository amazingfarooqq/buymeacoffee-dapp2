import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContextAPI } from '../lib/contextapi';
import MessageBox from '../components/MessgeBox/MessageBox';
import { pagefunc } from '../lib/functions';
import PageLoading from '../components/Page/PageLoading';
import PageNotFound from '../components/Page/PageNotFound';
import PageExist from '../components/Page/PageExist';

export async function getServerSideProps(context) {
    return { props: { page: context.query.page } };
  }

const page = (props) => {

    const {message, setMessage} = useContextAPI()

    const [page, setPage] = useState({ loading: true,pagenametopageidString:"", pagenameExists:false, contributedcoffees:"", pagename:"",donatePrice:"",imageURI:"",memberaddress: "",totaldonater:"", contributers:[] })

    const fetch = async () => {
        
        const data = await pagefunc(props.page)
        const { loading, pagenametopageidString, pagenameExists, contributedcoffees, pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers } = data.props

        setPage({ loading, pagenametopageidString, pagenameExists, contributedcoffees, pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers })
    }

    useEffect(() => {
        fetch()
    },[])


  return (

        <>
        {message?.isMessage &&
        <div className="container-fluid" style={{ position: 'fixed', top: '50px', right: '20px', zIndex: '111111', width: "300px" }}>
            <MessageBox message={message} setMessage={setMessage} value={0}/>
        </div>}


            {page.loading &&
                <PageLoading />
            }

            {!page.loading && page.pagenameExists &&
              <PageExist page={page} setPage={setPage}/>
            }

            {!page.loading && !page.pagenameExists &&
                <PageNotFound membername={props.page}/>
            }
        </>
  )
}

export default page