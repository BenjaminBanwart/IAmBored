import { useState } from 'react';

export default function Home () {
    let [thingsToDo, updateThingsToDo] = useState([])

    return (
        <div>
            <p>Home page</p>
        </div>
    )
}
