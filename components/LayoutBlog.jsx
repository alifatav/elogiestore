import Head from "next/head"
import Link from "next/link"
import React from "react"
import MENU from "../library/BlogMenu"
import Footer from "./Footer"

export default function LayoutStore({
	title="", 
	pageTitle="",
	children
}){
	const [idShow, setIdShow] = React.useState("")
	const [sidebarShow, setSidebarShow] = React.useState(false)

	const close = () => {
		setSidebarShow(false)
	}

	const open = () => {
		setSidebarShow(true)
	}	

	const showThisId = idshow => () => {
		setIdShow(prevState => {
			if(prevState === idshow) return ""
			return idshow
		})
	}

	return (<>
			<div id="body" className="w3-content" style={{maxWidth:"1200px"}}>
				<Head>
					<meta charSet="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <meta name="theme-color" content="#000849" />

					<title>Elogie Store | {title} </title>
				</Head>

				{/* Sidebar/menu */}
				<nav className="w3-sidebar sidebar w3-bar-block w3-theme-white w3-collapse w3-top" style={{zIndex:"3",width:"250px", display: sidebarShow?"block":"none"}} id="mySidebar">
				  <div className="w3-container w3-display-container w3-padding-16">
				    <i onClick={close} className="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
			    	<h3 className="w3-wide">
				    	<Link href="/">
				    		<b style={{cursor: "pointer"}}>ELOGIE</b>
				    	</Link>
			    	</h3>
				  </div>

  				<div className="w3-padding-64 w3-large w3-text-grey" style={{fontWeight:"bold", color: "#808080"}}>
						 <Link href="/">
						 	<a className="w3-bar-item w3-button w3-light-grey">Home</a>
						 </Link>
						 <Link href="/">
						 	<a className="w3-bar-item w3-button w3-light-grey">Store</a>
						 </Link>
			    {MENU.map(value => (
			    		<React.Fragment key={value.id}>
			    			<button onClick={showThisId(value.id)} className="w3-button w3-block w3-white w3-left-align" id="myBtn">
			      		{value.name} <i className="fa fa-caret-down"></i>
			    			</button>
			    			<div id={value.id} className={`w3-bar-block ${idShow === value.id? "w3-show": "w3-hide"} w3-padding-large w3-medium`}>
						      {value.submenu.map(subvalue => (
						 						<Link href="/category/[slug]" as={"/category/"+subvalue.url} key={subvalue.id}>
						      		<a className="w3-bar-item w3-button w3-light-grey">{subvalue.name}</a>
						 						</Link>
						      ))}
						    </div>
			    		</React.Fragment>
			    ))}
			  	</div>

			  	<Link href="/blog/fashion">
				  	<a className="w3-bar-item w3-button w3-padding">fashion blog</a> 
			  	</Link>
			  	<Link href="/blog/finance">
				  	<a className="w3-bar-item w3-button w3-padding">finance blog</a> 
			  	</Link>
				</nav>

				{/* Top Menu on Small Screen */}
				<header className="w3-bar w3-top w3-hide-large w3-theme w3-xlarge">
  			<div className="w3-bar-item w3-padding-24 w3-wide">ELOGIE</div>
  			<a href="#" className="w3-bar-item w3-button w3-padding-24 w3-right" onClick={open}><i className="fa fa-bars"></i></a>
				</header>

				{/* Top Menu on Small Screen */}
				<div className="w3-overlay w3-hide-large" onClick={close} style={{cursor: "pointer", display: sidebarShow?"block":"none"}} title="close side menu" id="myOverlay"></div>

				{/* Page Content */}
				<div className="w3-main" style={{marginLeft:"250px"}}>
					{/* Push Down on Small Screen */}
					<div className="w3-hide-large" style={{marginTop:"83px"}}></div>

					{/* Top Header */}
					<header className="w3-container w3-xlarge">
			    <p className={`w3-left`}>{pageTitle}</p>
			    <p className="w3-right">
			      <i className="fa fa-shopping-cart w3-margin-right"></i>
			      <i className="fa fa-search"></i>
			    </p>
			  </header>

			  {children}

			  <Footer />
				</div>
				<style jsx>{`
					.w3-sidebar a {font-family: "Roboto", sans-serif}
      #body,h1,h2,h3,h4,h5,h6,.w3-wide {font-family: "Montserrat", sans-serif;}
				`}</style>
			</div>
  </>
	)
}