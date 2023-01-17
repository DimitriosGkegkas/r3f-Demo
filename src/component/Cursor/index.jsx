
import { useState, useEffect } from 'react';
import './Cursor.css'

export default function Cursor({left, top}) {


    if (top)
        return (
            <div className="cursor" style={{ left, top }}>
            </div>
        )
    else return <></>
}