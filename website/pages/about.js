import withLayout from '../components/hoc/withLayout';

const page = () => {
  return <div className="about">
    <div className="page-title">
      <h1>About Salsa Mish</h1>
    </div>
    <section>
      <img src="" alt="Picture of Mish" />
      <h2>Salsa Mish</h2>
      <p className="question">How long have you been dancing?</p>
      <p>
        <span>I have been interested in dancing since I was 2 years of age, I was called the dancer by the family.</span>
        <span>I always danced at parties and almost every day.</span>
      </p>
      <p className="question">What dance influenced you?</p>
      <p>
        Egyptian belly dancing as I am Egyptian who lived the first 25 years of my life in Egypt.
      </p>
      <p className="question">What made you come to the UK?</p>
      <p>
        When I was 14 years of age, my ex brother in law (British) 
        saw me dancing and said to me "you would make a lot of money in the UK dancing"
        and that sentance stayed in my head and I decided that one day I would be teaching dancing in the UK.
      </p>
      <p className="question">What did you do before coming to the UK?</p>
      <p>
        In Egypt I studied Medicine for 6 years but 2 months before the final. 
        I decided to go to England and try to complete my studies there. 
        After I arrived, I got a job working as a barman in 
        The Rocket Club in Holloway Road and that changed my life direction. 
      </p>
      <p className="question">Where did you learn latin dancing?</p>
      <p>
        <span>I first saw merengue, lambada and salsa dancing,  at The Rocket where I was working.</span>
        <span>
          I loved the music and was dancing behind and on top of the bar, 
          my own dancing as I didn’t know the steps. The lessons were in 
          a different room to the bar so I just learnt the steps by watching 
          people dancing after the lessons.
        </span> 
        <span>
          I made a fool of myself every Wednesday until lambada suddenly 
          clicked and I loved it. I learnt merengue from the first song 
          I heard as it is much easier than Lambada.
        </span>
        <span>I danced every day, on my own, everywhere I went I would be dancing to any music.</span>
      </p>
      <p className="question">When did you start teaching dance?</p>
      <p>
        <span>
          Later that year I started to work at Club Havana in St Albans where 
          I was teaching merengue and lambada to beginners, improvers and intermediates.
        </span>
        <span>
          I soon started to teach salsa and by 1993 I began to teach and DJ for different clubs all around England.
        </span>
      </p>
      <img src="" alt="Picture of dancers at Club Havana, St Albans" />
      <p className="question">When did you start your own club?</p>
      <p>
        I have always wanted to run my own club so I started Salsa Mish in 2005 at Esporta 
        fitness club in Hemel Hempstead every Saturday, I was still teaching Tuesday, 
        Thursday and Friday nights at Club Havana.
      </p>
      <img src="" alt="People dancing at Esporta, Hemel Hempstead" />
      <p className="question">When did you open Greenwood Park?</p>
      <p>
        <span>
          When Club Havana stopped latin dancing I knew there was a 
          need to keep a salsa event on Friday nights in St Albans going.
        </span>
        <span>
          I looked and found Greenwood Park Community Centre. 
          I felt that this was the right venue so started 
          my regular Friday Night in June 2010.
        </span>
      </p>
      <img src="" alt="Mish and a partner dancing at Greenwood Park, St Albans" />
      <p className="question">Have you ever worked with kids?</p>
      <p>
        I have taught dancing to kids in over 50 schools, mostly free, 
        to inspire them to dance and give them confidence, self-esteem, happiness and a lot of laughter!
      </p>
      <p className="question">What was your goal opening a regular weekly event?</p>
      <p>
        <span>
          I started Salsa Mish at Greenwood Park to share my passion for dancing and the music.
        </span>
        <span>
          I want to inspire people to dance. I provide a safe place for them to do so. 
          My Friday night helps people relax, dance, meet, socialise, respect, have fun 
          and forget problems for one night. Salsa Mish is like a big family gathering 
          where every age, nationality, sex and colour is welcomed.
        </span>
        <span>
          I love my Friday night club, whether it is busy or not, 
          the atmosphere is always great. My satisfaction comes from seeing 
          happiness and laughter all around me with amazing music and amazing people.
        </span>
      </p>
    </section>
  </div>
}

export default withLayout(page)
