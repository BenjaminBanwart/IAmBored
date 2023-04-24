import { useState } from 'react';

export default function Home () {
    let [thingsToDo, updateThingsToDo] = useState([])
    let [participants, updateParticipants] = useState(1)
    let [activityType, updateActivityType] = useState('')
    let [activityPrice, updateActivityPrice] = useState(0)

    return (
        <div>
            
        </div>
    )
}
