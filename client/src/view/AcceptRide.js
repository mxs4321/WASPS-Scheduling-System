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
  left: 449px;
  bottom: 3px;
  width: 370px;
  height: 210px;
  z-index: 1;
`;

const Text = styled.a`
	
`


 
export default ({users, origin, destination, phone, onReply, onAccept, onDecline, apiKey = "AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs", ...otherArgs}) => {
const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
//const { apiKey = window.REACT_APP_PLACES_API_KEY } = this.props;

return(
<Wrapper>
	<WrapperTop>
		<DivLeft>
		
			<Vertical />{origin}<br/><br/>
	    	<Destination />{destination}<br/><br/>
			<Calendar />Nov 15th 10am<br/><br/>
			<Phone />{phone}<br/><br/>
		</DivLeft>
		
	
	<Map>
		Map
		<Iframe
          key={apiKey}
          title="directions"
          frameborder="0"
          src={destination === '' ?placeIframe : directionIframe}
          allowfullscreen
        /> 
       
		</Map>
		
	</WrapperTop>
	
	<AvailableDiv>
		<Buttons>
			<Accept onClick={onAccept}>ACCEPT RIDE</Accept>
			<Decline onClick={onDecline}>DECLINE RIDE</Decline>
		</Buttons>
	</AvailableDiv>
	
	<ReplyDiv>
	{users.map(username => (
		<Avatar size={45} name={username}/>
	))}
		<Text onClick={onReply}>Reply</Text>
	</ReplyDiv>
	

</Wrapper>
);
}
 
 




