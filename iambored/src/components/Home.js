import { useState } from 'react';

let thingsToDo = []

export default function Home () {

    //handle form submission
    function handleSubmit(e) {
        if (thingsToDo.length === 3) {
            return alert('You have reached the maximum number of activities. Please refresh the page to start over.')
        }
        e.preventDefault();
        let type = document.getElementById('type').value;
        let partNum = document.getElementById('partNum').value;
        let url = `http://www.boredapi.com/api/activity?type=${type}&participants=${partNum}`

            fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                    thingsToDo.push(data)
                    updateParticipants(data.participants)
                    updateActivityType(data.type)
                    console.log(thingsToDo)
                    console.log(participants)
                    console.log(activityType)
                    console.log(url)
            })
            .catch(error => {
                console.error('There was a problem with the fetch request:', error);
            });
    }

    let [participants, updateParticipants] = useState(1)
    let [activityType, updateActivityType] = useState('')
    let [activityPrice, updateActivityPrice] = useState(0)

    return (
        <div className='container'>
            <div className='container flex-wrap mt-5' style={{display:"flex"}} >
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
                            <input type="radio" class="btn-check" name="radio" id="paid" autocomplete="off" value={"1"} />
                            <label class="btn btn-outline-info" for="paid">Paid</label>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary ms-5 mt-5">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className='container'>

            </div>
        </div>
    )
}
