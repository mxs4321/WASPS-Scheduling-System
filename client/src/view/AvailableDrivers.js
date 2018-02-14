import React from "react"
import styled from "styled-components";
import Destination from "./icons/Destination";
import Phone from "./icons/Phone";
import Calendar from "./icons/Calendar";
import GoogleRoutesForm from "./forms/GoogleRoutesForm";
import Vertical from "./icons/Vertical";
import Avatar from './Avatar';

const WrapperTop = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: gray;
	padding-top: 20px;
	width: 70%;
	position: absolute;
`
const Wrapper = styled.div`

`
const DivLeft = styled.div`
	float: left;
`

const Map = styled.div`
	float: right;
	border: 1px solid black;
`

const AvailableDiv = styled.div`
	width: 70%;
	height: 17%;
	position: absolute; 
	top: 217px;
	font-weight: bold;
	background-color: #f2f2f2; 
`

const ReplyDiv = styled.div`
	width: 70%;
	height: 65px;
	position: absolute; 
	top: 307px;
	padding-top: 10px;
	background-color: #e6e6e6;
`

const Reply = styled.p`
	font-size: 12px;
`
export default () => (
<Wrapper>
	<WrapperTop>
		<DivLeft>
			<Vertical />Cobbs Hill Park<br/><br/>
	    	<Destination />Rochester General Hospital<br/><br/>
			<Calendar />Nov 15th 10am<br/><br/>
			<Phone />203 525 4835<br/><br/>
		</DivLeft>
		
		<Map>
			Map goes here
		</Map>
	</WrapperTop>
	
	<AvailableDiv>
		Available Drivers<br/>
		<Avatar size={45} name="Niharika Nakka"/>
		<Avatar size={45} name="Brett Lamy"/>
		<Avatar size={45} name="Mohammad Suhail"/>
	</AvailableDiv>
	
	<ReplyDiv>
		<Avatar size={45} name="Niharika Nakka"/>Reply
	</ReplyDiv>

</Wrapper>
)




