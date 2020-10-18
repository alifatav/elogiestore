export default function Loader(){
	return (
		<div>
			<div style={{height: "35px"}} />
			
			<div className="loader" />

			<div style={{height: "35px"}} />
			<style jsx>{`
				.loader {
					margin-left: auto;
					margin-right: auto;
			  border: 12px solid #f3f3f3;
			  border-radius: 50%;
			  border-top: 12px solid #000849;
			  width: 80px;
			  height: 80px;
			  -webkit-animation: spin 2s linear infinite; /* Safari */
			  animation: spin 2s linear infinite;
				}

				/* Safari */
				@-webkit-keyframes spin {
			  0% { -webkit-transform: rotate(0deg); }
			  100% { -webkit-transform: rotate(360deg); }
				}

				@keyframes spin {
			  0% { transform: rotate(0deg); }
			  100% { transform: rotate(360deg); }
				}
			`}</style>
		</div>
	)
}