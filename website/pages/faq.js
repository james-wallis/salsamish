import withLayout from '../components/hoc/withLayout';

const page = () => {
    return <div className="faq">
        <div className="page-title">
            <h1>FAQ's</h1>
        </div>
        <section>
            <p className="question">Do I need a partner?</p>
            <p>No, during classes you are moved to different partners. Freestyle - ask people to dance with you.</p>
            <p className="question">Do I need to pre book?</p>
            <p>There is no pre booking, just turn up on the night.</p>
            <p className="question">What are the other people like?</p>
            <p>The salsa crowd is very mixed, all ages, all nationalities, all abilities.</p>
            <p className="question">What clothes should I wear?</p>
            <p>Something you are comfortable moving around in. Some are casual some bling it up.</p>
            <p className="question">What shoes should I wear?</p>
            <p>The sole of your shoes need to glide on the floor, i.e. leather soles or dance shoes.</p>
            <p className="question">What time are the classes?</p>
            <p>
                <span>Beginners</span>
                <span>Bachata 7.30 - 8.00</span>
                <span>Kizomba 8.00 - 8.50</span>
                <span>Salsa 8.50 - 9.45</span>
            </p>
            <p>
                <span>Improvers</span>
                <span>Bachata 9.15 - 9.45</span>
                <span>Kizomba 8.00 - 8.50</span>
                <span>Salsa 8.50 - 9.45</span>
            </p>
            <p>The classes are timed so you can dance all evening and stay for freestyle.</p>
            <p className="question">What refreshments are available?</p>
            <p>Soft drinks bar</p>
            <p>Complimentary tea, coffee, biscuits and cake. The tea room open is open 10.15 - 12.15</p>
            <p>We do not sell alcohol but you can bring your own</p>
            <p className="question">Is there parking? (See parking page)</p>
            <p>
                <span className="italic">The main carpark is usally full by 9.00pm</span>
                <span className="italic">There is a second car park 0.4 miles away</span>
                <span className="italic">with a free mini bus every 15 minutes.</span>
                <span className="italic">Please do not park in nearby streets.</span>
            </p>
            <p className="question">Is it near a train station?</p>
            <p>St Albans is the nearest</p>
            <p className="question">Is it near a motorway?</p>
            <p>The venue is close to J21a M25 and J6a M1</p>
            <p className="question">Are there any hotels nearby?</p>
            <ul>
                <li>Mercure St Albans Noke Hotel</li>
                <li>Sopwell House</li>
                <li>St Michael's Manor Hotel</li>
                <li>White Hart Hotel St Albans</li>
                <li>Premier Inn St Albans City Centre Hotel</li>
            </ul>
            <p className="question">What happens to lost property?</p>
            <p>
                Any left items are kept at Greenwood Park. 
                Please ask at the front desk next time you are at Salsa Mish. 
                After a few months items are dontated to charity.
            </p>
            <p className="question">Is there any photography?</p>
            <p>
                Photographs are taken most Fridays. 
                If you do not want to be in any photos posted on 
                social media pleaes tell the photographer.
            </p>
            <p className="question">Where can I see the photos taken?</p>
            <p>
                Julian Robbins and John Boot are photographers that regularly take photos. 
                They add them to albums on Facebook, usually with a link on the Salsa Mish page.
            </p>
        </section>
    </div>
}

export default withLayout(page)
