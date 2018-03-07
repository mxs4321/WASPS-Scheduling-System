import React from 'react';
import styled from 'styled-components';
import User from "./icons/User";

const Wrapper = styled.div`
	font-weight: bold;
	width: 70%;
	height: 100%;
`
const Heading = styled.div`
	color:  #004d99;
	font-size: 1.3em;
	border-bottom: 1px solid #004d99;
	margin: 15px;
`

const Flex = styled.div`
  display: flex;
  border-bottom: 1px solid red;
`

const Input = styled.input`
	display: block;
	background-color: #E8E8E8;
	width: 235px;
	height: 25px;
	margin: 6px;
	font-size: 14px;
	color: #A9A9A9;
	border: none;
`

const Label = styled.label`
	width: 200px;
	display: inline-block;
	text-align: left;
	font-family: Arial, Helvetica, sans-serif;
	
`

const Field = styled.div`
	width: 200px;
	display: inline-block;
	text-align: left;	

`

const Checkbox = styled.input`
	cursor: pointer;
	margin-top:10px;
	-webkit-appearance: none;
	-moz-appearance: none;
	width: 25px;
	height: 25px;
	background-color: #E8E8E8;
	cursor: pointer;
	&:checked {background-color: white; 
			   width: 10px; 
			   height: 20px;
			   border: solid green; 
			   border-width: 0 4px 4px 0;
			   transform: rotate(45deg);}
`

const ButtonsDiv = styled.div`
	width: 70%;
	height: 17%;
	position: absolute; 
	top: 217px;
	font-weight: bold;
	background-color: #f2f2f2; 
`

const Save = styled.button`
	height: 40px; 
	width: 150px;
	background-color: #0073e6;
	color: white;
	font-weight: bold;
	font-size: 15px;
	border-radius: 8px;
	cursor: pointer;

`

const Cancel = styled.button`
	height: 40px; 
	width: 150px;
	background-color: #cc0000;
	color: white;
	font-weight: bold;
	font-size: 15px;
	border-radius: 8px;
	margin: 70px;
	cursor: pointer;
	
`
const Buttons = styled.div`
	position: absolute;
	top: 350px;
	left: 80px;
	padding: 10px;
	padding-left: 80px;
	display: inline;
`

const EditDiv = styled.div`
	position: relative;
	left: 200px;
	top: 10px;
`

export default({onSave, onCancel}) => {

return (
<Wrapper>

	<Heading>
		<User />Edit Profile
	</Heading>
	
	<EditDiv>
		<Label>First Name</Label>
			<Field><Input /></Field><br/>
		<Label>Last Name</Label>
			<Field><Input /></Field><br/>
		<Label>Phone</Label>
			<Field><Input /></Field><br/>
		<Label>Email Address</Label>
			<Field><Input /></Field><br/>
		<Label>Current Password</Label>
			<Field><Input /></Field><br/>
		<Label>New Password</Label>	
			<Field><Input /></Field><br/>
		<Label>Wants SMS</Label>
			<Field><Checkbox type="checkbox" name="sms"/></Field><br/>
		<Label>Wants Email</Label>
			<Field><Checkbox type="checkbox" name="email"/></Field><br/>
	</EditDiv>

	<Buttons>
			<Cancel onClick={onCancel}>CANCEL</Cancel>
			<Save onClick={onSave}>SAVE</Save>
	</Buttons>

</Wrapper>
);
}