import React from 'react'
import '../css/Details.css'

const Details = () => {
    return (
        <div class="widget">
            <div class="tabs">
                <input id="tab-1" type="radio" name="group" />
                <input id="tab-2" type="radio" name="group" />
                <input id="tab-3" type="radio" name="group" />

                <div class="labels">
                    <label class="material-symbols-outlined" for="tab-1"> Home </label>
                    <label class="material-symbols-outlined" for="tab-2"> lock </label>
                    <label class="material-symbols-outlined" for="tab-3">
                        settings
                    </label>
                    {/* <div class="underline"></div> */}
                </div>

                <div class="content">
                    <div class="content-inner">
                        <div>
                            <h2>Home</h2>
                            <p>
                                This is the tab content,
                                you can put anything you lik
                            e in here. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum nisi, obcaecati suscipit similique, a error officiis voluptatibus ullam quam eos commodi, repellat id expedita nam dolorem ad cumque optio labore deserunt perferendis assumenda ex!
                            </p>
                        </div>
                        <div>
                            <h2>Account</h2>
                            <p>
                                This is the tab content, you can put anything you like in here.
                            </p>
                        </div>
                        <div>
                            <h2>Settings</h2>
                            <p>
                                This is the tab content, you can put anything you like in here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details