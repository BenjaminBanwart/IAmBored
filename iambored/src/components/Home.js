import { useState } from 'react';


export default function Home () {

    const [thingsToDo, setThingsToDo] = useState([]);

    const myThingsToDo = thingsToDo.map((thing) =>
        <div class="card bg-secondary mb-3 ms-3 mt-3" style={{maxWidth:"20rem"}}>
            <div class="card-header">{thing.activity}</div>
                <div class="card-body">
                    <ul>
                        <li>
                            <p class="card-title">Type: {thing.type}</p>
                        </li>
                        <li>
                            <p class="card-text">Link: {thing.link}</p>
                        </li>
                        <li>
                            <p class="card-text">Participants: {thing.participants}</p>
                        </li>
                        <li>
                            <p class="card-text">Price: {thing.price}</p>
                        </li>
                    </ul>
                </div>
            </div>
    );

    if (thingsToDo.length === 3) {
        document.getElementById('submit').disabled = true;
    }


    //api call
    function apiCall(url) {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                if (!thingsToDo.includes(data.activity)) {
                    setThingsToDo(prevThingsToDo => [...prevThingsToDo, data]);
                    updateParticipants(data.participants)
                    updateActivityType(data.type)
                    console.log(thingsToDo)
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
    }

    //handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        let type = document.getElementById('type').value;
        let partNum = document.getElementById('partNum').value;
        let price = '';
        if (document.getElementById('free').checked) {
            price = document.getElementById('free').value;
        } else if (document.getElementById('paid').checked) {
            price = document.getElementById('paid').value;
        }

        let url = `http://www.boredapi.com/api/activity?type=${type}&participants=${partNum}&price=${price}`

        apiCall(url)
    }

    let [participants, updateParticipants] = useState(1)
    let [activityType, updateActivityType] = useState('')

    // Not enough support on the API for this below logic to work
    // let priceForActivity = Math.floor(Math.random() * (100 - 10) + 10) / 100;
    // let priceString = priceForActivity.toString();

    return (
        <div className='container' style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
            <div className='flex-wrap mt-5' style={{display:"flex", background:"white", maxWidth:"25rem", borderRadius:"1em", maxHeight:"26rem"}} >
                <form onSubmit={(e) => handleSubmit(e)} name='form'>
                    <fieldset>
                        <legend className='ms-3'>What do you want to do?</legend>
                        <div className='form-group ms-5'>
                            <label for="type" class="form-label mt-4">Activity Type</label>
                            <select class="form-select" id="type">
                                <option></option>
                                <option>education</option>
                                <option>recreational</option>
                                <option>social</option>
                                <option>diy</option>
                                <option>charity</option>
                                <option>cooking</option>
                                <option>relaxation</option>
                                <option>music</option>
                                <option>busywork</option>
                            </select>
                            <small id="emailHelp" class="form-text text-muted">Leave blank for random.</small>
                        </div>
                        <div class="form-group ms-5">
                            <label for="partNum" class="form-label mt-4">Participants</label>
                            <input type="number" class="form-control" id="partNum" min="1" max="25" />
                        </div>
                        <div class="btn-group ms-5 mt-5" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="radio" id="free" autocomplete="off" value={"0"} />
                            <label class="btn btn-outline-info" for="free">Free</label>
                            {/* Not enough support on the API to implement randomized amounts of money for price */}
                            <input type="radio" class="btn-check" name="radio" id="paid" autocomplete="off" value={"0.2"} />
                            <label class="btn btn-outline-info" for="paid">Paid</label>
                        </div>
                        <div>
                            <button type="submit" id='submit' class="btn btn-primary ms-5 mt-5">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className='flex-wrap mt-5' style={{background:"white", maxWidth:"25rem", borderRadius:"1em"}}>
                {myThingsToDo}
            </div>
        </div>
    )
}
