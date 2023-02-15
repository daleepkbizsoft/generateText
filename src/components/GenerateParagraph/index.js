import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import copy from "copy-to-clipboard";
class GenerateParagraph extends Component {
	render() {
		return (
		<> 
			<Singlecomment />
		</>
	  );
	}
}
class Singlecomment extends Component {
	constructor(props) {
	  super(props);
	  this.state = {value: ''};
	  this.state = { items: [], text: '', selectedItems:[], apiResponsetext:'', title:'', loading:false,CopyText:'', CopyDescText:'', showsubmit:false };
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
    
	handleChange(event) {
	  this.setState({value: event.target.value});
	}
  
	handleSubmit(event) {
	  	event.preventDefault();
		if (this.state.value.length === 0) {
			return;
		}

		const newItem = {
			text: this.state.value,
			id: Date.now()
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: '',
			value: ''
		}));

		//this.setState({value: ''});

	}
	handleChangeCheck(e) {
		let combinedtext ='';
		let isChecked = e.target.checked;
		this.props.selectedItems = this.state.selectedItems;
		const newItem = {
			text: e.target.value,
			id: e.target.id
		};

        if(isChecked){
			this.props.selectedItems = this.props.selectedItems.concat(newItem)
			
		}else{
			var array = this.props.selectedItems;
			const isLargeNumber = (element) => element.id == e.target.id;
			var index = array.findIndex(isLargeNumber);
			if (index !== -1) {
			  array.splice(index, 1);
			  this.props.selectedItems = array;
			 
			}
			//console.log(this.props.selectedItems)

		}
		
		

        console.log(this.props.selectedItems)
		this.setState(state => ({ selectedItems: this.props.selectedItems}));

	   if( _.isEmpty(this.props.selectedItems)){
			//alert("falseee")
			this.setState({showsubmit: false});
		}else{
			//alert("truee")
			this.setState({showsubmit: true});
			
		}
		
	}
	removeItem(e){
		//alert(e.target.id)
		if (window.confirm("Are you Sure to Remove This Paragraph?")) {
			var array = this.state.items;
			const isLargeNumber = (element) => element.id == e.target.id;
			var index = array.findIndex(isLargeNumber);
			if (index !== -1) {
				array.splice(index, 1);
				//this.state.selectedItems = array;
				this.setState(state => ({ items: array}));
			}
		}

	}

	copyTextTitle(e){
		if(this.state.title){
			copy(this.state.title);
        	alert(`You have copied Title`);
		}
		
	}
	copyTextDesc(e){
		if(this.state.title){
			copy(this.state.apiResponsetext);
        	alert(`You have copied Description`);
		}
	}
	
	async sendParatoApi() {
        if( _.isEmpty(this.state.selectedItems)){
			alert("Please Select atlreast One Paragraph")
		}else{
			this.setState({ loading: true });
		}
		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
				action: 'testdata',
				data: this.state.selectedItems 
			})
        };
		
		await fetch("https://leadforest.net/adalo/",requestOptions)
       .then(response => response.json())
       .then(response => {
			console.log(" REsponse"+response);
			this.setState({ apiResponsetext: response.combinedText });
			this.setState({ title: response.title });
			this.setState({ loading: false });
		})
		.catch(err => {
			console.log(err);
			//this.setState({ isLoading: false });
		});
	}
  
	render() {
		const containerstyle = {
			padding: "10px",
			fontFamily: "Arial",
			width: "100%",
		};
		const leftstyle = {
			width: "45%",
			float: "left",
			padding:"10px 50px 10px 119px",
		};
		const rightstyle = {
			width: "55%",
			float: "left", 
			padding:"10px 70px 10px 70px",
		};
		const buttonstyleleft = {
			color: "#fff",
			background: "#101573",
			padding: "12px 70px",
			margin: "5px",
			fontSize:"20px",
			width:"190px",
			borderRadius: "20px",
			cursor: "pointer",
		
		}
		const buttonstyleright = {
			color: "#fff",
			background: "green",
			padding: "12px 70px",
			margin: "5px",
			fontSize:"20px",
			width:"190px",
			float:"right",
			borderRadius: "20px",
			cursor: "pointer",
		
		}
		
		const textareastyle = {
			padding: "10px",
			fontSize: "24px",
			margin: "0px 0px 20px 0px",
			borderRadius: "20px",
			width:"100%",
			
		}
		const right_textareastyle = {
			padding: "10px",
			fontSize: "24px",
			margin: "0px 0px 20px 0px",
			borderRadius: "20px",
			width:"100%",
			
		}
		
		const listyle= {
			padding: "6px",
			border: "2px solid #000",
			fontSize: "20px",
			margin: "10px",
			listStyle:"none",
		}		
		const inputcheck = { 
			fontSize: "20px",
			float: "right",
			width: "1.4em",
			height: "1.2em",
			border: "0.15em solid #007a7e",
			outline: "none",
			cursor: "pointer",

		}
		const inputtext = { 
			width: "100%",
			height: "55px",
			margin: "0px 0px 20px 0px",
			fontSize:"24px",
			padding:"10px", 
			borderRadius: "20px",
		}
		const removebutton = { 
			float: "right",
			margin: "0px -78px 0px 0px",
			zIndex: "999",
    		position: "sticky",
			background: "red",
			color: "#fff",
			padding:"0px 8px",
			border: "none",
			fontSize: "24px",
			cursor: "pointer",
		}
		const copystyle ={
			width: "55px",
			height:"55px",
			position: "absolute",
			margin:"0px 0px 0px -55px",	
			cursor: "pointer",
		}
	    return (
		<view style={containerstyle}>
			<view style={leftstyle}>
				<textarea placeholder="Enter Paragraph" style={textareastyle} rows={1} value={this.state.value} onChange={this.handleChange}/> 
				
				<button style={buttonstyleleft} type="button" className="concatnate" onClick={this.handleSubmit.bind(this)} >Add </button>
                
				{this.state.showsubmit ? <><button style={buttonstyleright} type="button" className="concatnate" onClick={this.sendParatoApi.bind(this)} > {this.state.loading ? <>Loading..</> : <>Submit</>}</button></> :<> </>}
				

				<ul>
					{this.state.items.map((subItems, sIndex) => {
						return <li style={listyle} key={subItems.id}> <label for={subItems.id}>{subItems.text}</label> <input style={inputcheck}  onChange={e => this.handleChangeCheck(e)} value={subItems.text}  type="checkbox" id={subItems.id} /> <button style={removebutton} type="button" id={subItems.id} className="removebutton" onClick={this.removeItem.bind(this)}> x </button></li>
					})}
				</ul>
				

			</view>
			<view style={rightstyle}>
				<input placeholder="Generated Title"  style={inputtext}  value= {this.state.title} type="text" />
				<button title="Copy To Clipboard" style={copystyle} type="button"  className="" onClick={this.copyTextTitle.bind(this)}><svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				>
				<path d="M13 7H7V5H13V7Z" fill="currentColor" />
				<path d="M13 11H7V9H13V11Z" fill="currentColor" />
				<path d="M7 15H13V13H7V15Z" fill="currentColor" />
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
					fill="currentColor"
				/>
				</svg></button> 
				
				<textarea placeholder="Generated Paragraph" style={right_textareastyle}  rows={6} value= {this.state.apiResponsetext} /> 
				<button title="Copy To Clipboard"  style={copystyle} type="button"  className="" onClick={this.copyTextDesc.bind(this)}><svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				>
				<path d="M13 7H7V5H13V7Z" fill="currentColor" />
				<path d="M13 11H7V9H13V11Z" fill="currentColor" />
				<path d="M7 15H13V13H7V15Z" fill="currentColor" />
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
					fill="currentColor"
				/>
				</svg></button> 
			</view>

			
			
		</view>
		
	  );
	}
  } 
const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default GenerateParagraph
