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

const Accept = styled.button`
	height: 50px; 
	width: 300px;
	background-color: #00b33c;
	color: white;
	font-weight: bold;
	font-size: 30px;
`

const Decline = styled.button`
	height: 50px; 
	width: 300px;
	background-color: #cc0000;
	color: white;
	font-weight: bold;
	font-size: 30px;
`
const Buttons = styled.div`
	position: absolute;
	top: 10px;
	padding: 10px;
	padding-left: 80px;
	display: inline;
`

const Iframe = styled.iframe`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  z-index: 1;
`;

//const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
//const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
//const { apiKey = window.REACT_APP_PLACES_API_KEY } = this.props;
 
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
	/*	<Iframe
          key={apiKey}
          title="directions"
          frameborder="0"
          src={destination === '' ?placeIframe : directionIframe}
          allowfullscreen
        /> */
        
		</Map>
	</WrapperTop>
	
	<AvailableDiv>
		<Buttons>
			<Accept>ACCEPT RIDE</Accept>
			<Decline>DECLINE RIDE</Decline>
		</Buttons>
	</AvailableDiv>
	
	<ReplyDiv>
		<Avatar size={45} name="Niharika Nakka"/>Reply
	</ReplyDiv>

</Wrapper>
)




