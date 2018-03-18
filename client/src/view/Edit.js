import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import {Settings, Logout} from './icons';


const Navbar = styled.div`

`
const Button = styled.button`
	background-color: #4da6ff;
	color: white;
	padding: 6px;
	text-align: right;
	font-size: 16px;
	border: none;
	&:hover {background-color: #007acc;}
	width: 160px;
	height: 50px;
	&:hover ${Content} {display: block;}
`
const Content = styled.div`
	display: none;
	position: absolute;
	background-color: #f1f1f1;
	min-width: 160px;
	z-index: 1;
	
`
const Dropdown = styled.div`
	position: relative;
	display: inline-block;
	&:hover ${Content} {display: block;}
`

const Link = styled.a`
	color: white;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: center;
	background-color: #4da6ff;
	border: 1px solid #007acc;
	&:hover {background-color: #007acc; cursor: pointer;}
`


export default({users, goToEditProfile, logout}) => (
<Navbar>
	<Dropdown>
		<Button class="dropbtn">
		{users.map(username => (
			<Avatar size={30} name={username}/>
		))}
		</Button>
		 <Content class = "dropdown-content">
	 		<Link onClick={goToEditProfile}><Settings/>Edit Profile</Link>
	 		<Link onClick={logout}><Logout/>Logout</Link>
	 	</Content>
	</Dropdown>
	
</Navbar>

)