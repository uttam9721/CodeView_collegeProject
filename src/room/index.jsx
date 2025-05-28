import React, { useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useParams } from 'react-router-dom'

const MeetingPage = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        const appID = 1561528184;
        const serverSecret = "047efe8d2ab2b52ccf51992f309873e3";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Enter Your Name");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            }
        })
    }
    return (
        <div className='room-page'>
           <div className='room' ref={myMeeting}/>
        </div>
    )
}

export default MeetingPage