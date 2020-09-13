import Head from 'next/head'
import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutDefault(props){
	return (
		<div>
			<Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Verdana" />

    <title>Elogie | {props.title} &#128526; &#128522;</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="icon" href="/favicon.jpg" sizes="20x20" type="image/png" />
    <link rel="stylesheet" href="/css/theme.css" />
    <link rel="stylesheet" href="/css/main.css" />

  	</Head>

  	<Header />
   <Navbar onCategory={props.onCategory}/>
   
   <div style={{height: "25px"}} />
   <div className="w3-container">
   	{props.children}
   </div>
   <Footer />
		</div>
	)
}