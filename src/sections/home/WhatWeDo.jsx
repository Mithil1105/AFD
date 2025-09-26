import React from 'react';
import { GiPathDistance, GiWoodenSign, GiTrail } from 'react-icons/gi';
import { TbBuildingBridge2 } from 'react-icons/tb';

export default function WhatWeDo() {
    return (
        <section className="what">
            <div className="container">
                <div className="what__head">
                    <h2 className="what__title">What We Do</h2>
                    <p className="what__sub">We design eco-tourism experiences and build forest infrastructure that respects habitats.</p>
                </div>

                <div className="what__grid">
                    <div className="what__card">
                        <div className="what__icon" aria-hidden>
                            <GiPathDistance />
                        </div>
                        <h3>Eco-Tourism Planning</h3>
                        <p className="what__blurb">Visitor journeys, capacity planning, route design, and interpretive storytelling.</p>
                        <ul className="what__list">
                            <li>Wayfinding systems</li>
                            <li>Interpretive signage</li>
                            <li>Visitor flow</li>
                        </ul>
                    </div>

                    <div className="what__card">
                        <div className="what__icon" aria-hidden>
                            <TbBuildingBridge2 />
                        </div>
                        <h3>Forest Infrastructure</h3>
                        <p className="what__blurb">Boardwalks, shelters, viewing decks, and low-impact amenities engineered for longevity.</p>
                        <ul className="what__list">
                            <li>Boardwalks & decks</li>
                            <li>FRP/ferro-cement amenities</li>
                            <li>View shelters</li>
                        </ul>
                    </div>

                    <div className="what__card">
                        <div className="what__icon" aria-hidden>
                            <GiTrail />
                        </div>
                        <h3>Restoration & Trails</h3>
                        <p className="what__blurb">Trail building, erosion control, buffers, and safety-first signage.</p>
                        <ul className="what__list">
                            <li>Erosion control</li>
                            <li>Habitat buffers</li>
                            <li>Risk-assessed wayfinding</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}


