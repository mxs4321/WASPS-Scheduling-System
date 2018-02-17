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

const Iframe = styled.iframe`
  position: absolute;
  left: 449px;
  bottom: 3px;
  width: 370px;
  height: 210px;
  z-index: 1;
`;


export default ({origin, destination, apiKey = "AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs", ...otherArgs}) => {
const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
//const { apiKey = window.REACT_APP_PLACES_API_KEY } = this.props;

return(
<Wrapper>
	<WrapperTop>
		<DivLeft>
			<Vertical />Cobbs Hill Park<br/><br/>
	    	<Destination />Rochester General Hospital<br/><br/>
			<Calendar />Nov 15th 10am<br/><br/>
			<Phone />203 525 4835<br/><br/>
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
		Available Drivers<br/>
			{["Niharika Nakka", "Brett Lamy", "Mohammad Suhail"].map(name =>
				<Avatar size={45} name={name}/>
			)}
	</AvailableDiv>
	
	<ReplyDiv>
		<Avatar size={45} name="Niharika Nakka"/>Reply
	</ReplyDiv>

</Wrapper>
);
}




