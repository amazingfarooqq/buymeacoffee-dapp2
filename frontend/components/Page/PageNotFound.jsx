import Link from 'next/link'
import React from 'react'

const PageNotFound = ({membername}) => {
  return (
    <div id="notfound">
<div className="notfound">
<div className="notfound-404">
<h1>Oops!</h1>
<h2>404 - We cant find any member with {membername}</h2>
</div>
<Link href="/">Go TO Homepage</Link>
</div>
</div>
  )
}

export default PageNotFound