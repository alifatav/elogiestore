import React from "react"
import Axios from "axios"
import LayoutDashboard from "../../components/LayoutDashboard"

const fakevalues = {
	name: "", slug: ""
}

const fakemodaldelete = {
	isOpen: false, deleteId: 0
}

const fakemodaledit = {
	isOpen: false, editId: 0
}

export default function ProductCategory(){
	const [values, setValues] = React.useState({...fakevalues})
	const [allCategory, setAllCategory] = React.useState([])
	const [modalDelete, setModalDelete] = React.useState({...fakemodaldelete})
	const [modalEdit, setModalEdit] = React.useState({...fakemodaledit})

	const toggleModalEdit = (id, data) => () => {
		setModalEdit(prevState => {
			if(prevState.isOpen){
				setValues({...fakevalues})
				return {...fakemodaledit}
			} 
			setValues({name: data.name, slug: data.slug})
			return {isOpen: true, editId: id}
		})
	}

	const toggleModalDelete = id => () => {
		setModalDelete(prevState => {
			if(prevState.isOpen) return {...fakemodaldelete}
			return {isOpen: true, deleteId: id}
		})
	}

	const valueChange = name => event => {
		setValues({...values, [name]: event.target.value})
	}

	const validate = () => {
		if(values.name.length <= 0) return true
		if(values.slug.length <= 0) return true
		return false
	}

	const CREATECATEGORY = () => {
		const x = allCategory
		const new_data = {id: 0, name: values.name, slug: values.slug}

		Axios.post("/api/elogie/category", {
			...values
		}).then(res => {
			setValues({...fakevalues})
			setAllCategory([{...new_data, id: res.data}, ...x])
		}).catch(error => {
			console.log(error)
		})
	}

	const UPDATECATEGORY = () => {
		const id = modalEdit.editId
		const x = allCategory
		const x_ = allCategory.filter(value => value.id !== id)
		const y = {id: id, name: values.name, slug: values.slug }
		setAllCategory([y,...x_])
		setValues({...fakevalues})
		setModalEdit({...fakemodaledit})

		Axios.put(`/api/elogie/category?id=${id}`, {
			...values
		}).then(res => {
			console.log(res.data)
		}).catch(error => {
			setAllCategory([...x])
			console.log(error)
		})
	}

	const DELETECATEGORY = () => {
		const id = modalDelete.deleteId
		const x = allCategory
		const x_ = allCategory.filter(value => value.id !== id)
		setAllCategory([...x_])
		setModalDelete({...fakemodaldelete})

		Axios.delete(`/api/elogie/category?id=${id}`)
			.then(res => {
				console.log(res.data)
			}).catch(error => {
				setAllCategory([...x])
				console.log(error)
			})
	}

	React.useEffect(() => {
		Axios.get("/api/elogie/category")
			.then(res => {
				setAllCategory(res.data)
			}).catch(error => {
				console.log(error)
			})
	}, [])

	const inputModifier = (
		<div className="w3-row-padding">
			<p className="w3-col w3-half">
				<label>Nama Kategori</label>
				<input
					className="w3-input"
					type="text"
					name="name"
					value={values.name}
					onChange={valueChange("name")}
				/>
			</p>
			<p className="w3-col w3-half">
				<label>Slug Kategori</label>
				<input
					className="w3-input"
					type="text"
					name="slug"
					value={values.slug}
					onChange={valueChange("slug")}
				/>
			</p>
		</div>
	)

	return (
		<LayoutDashboard pageTitle="Category">
			<div className="w3-container">
				<div>
					{inputModifier}

					<button 
						className="w3-button w3-theme" 
						onClick={CREATECATEGORY} 
						disabled={validate()}
					>
						kirim
					</button>
				</div>
				
				<div style={{height: "35px"}} />

				<div>
					<table className="w3-table-all">
						<thead>
							<tr>
		      <th>id</th>
		      <th>name</th>
		      <th>slug</th>
		      <th>action</th>
			    </tr>
			   </thead>
			   <tbody>
			    {allCategory.map(value => (
			    	<tr key={value.id}>
			      <td>{value.id}</td>
			      <td>{value.name}</td>
			      <td>{value.slug}</td>
			      <td>
			      	<button 
			      		className="w3-button w3-small w3-blue"
			      		onClick={toggleModalEdit(value.id, value)}
			      	>
			      		edit
			      	</button>
			      	<button 
			      		className="w3-button w3-small w3-red"
			      		onClick={toggleModalDelete(value.id)}
			      	>
			      		delete
			      	</button>
			      </td>
				    </tr>
			    ))}
			   </tbody>
					</table>
				</div>
			</div>

			<div style={{height: "35px"}} />

			{modalEdit.isOpen && (
				<div 
					id="modal-edit-category" 
					className="w3-modal" 
					style={{display: modalEdit.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalEdit(0, {})}
	        className="w3-button w3-display-topright">&times;</span>
	      		<h3>Edit Category</h3>
	      </header>
	      <div className="w3-container">
								{inputModifier}
	      </div>
	      <footer className="w3-container">
	      	<button 
	       	className="w3-button w3-small w3-theme w3-right"
				     onClick={UPDATECATEGORY}
				     disabled={validate()}
	       >
	      		kirim
	      	</button>
	       <button 
	       	className="w3-button w3-small w3-blue w3-right"
				     onClick={toggleModalEdit(0, {})}
	       >
	      		cancel
	      	</button>
	      </footer>
	    </div>
	  	</div>
			)}

			{modalDelete.isOpen && (
				<div 
					id="modal-delete-category" 
					className="w3-modal" 
					style={{display: modalDelete.isOpen ? "block": "none"}}
				>
	    <div className="w3-modal-content w3-animate-bottom">
	      <header className="w3-container"> 
	        <span onClick={toggleModalDelete(0)}
	        className="w3-button w3-display-topright">&times;</span>
	      </header>
	      <div className="w3-container" style={{textAlign: "center"}}>
	        <p>Hapus kategory id {modalDelete.deleteId} ?</p>
	      </div>
	      <footer className="w3-container" style={{textAlign: "center"}}>
	       <button 
	       	className="w3-button w3-small w3-blue"
				     onClick={toggleModalDelete(0)}
	       >
	      		cancel
	      	</button>
	      	<button 
	      		className="w3-button w3-small w3-red"
	      		onClick={DELETECATEGORY}
	      	>
	      		delete
	      	</button>
	      </footer>
	    </div>
	  	</div>
			)}
			
		</LayoutDashboard>
	)
}