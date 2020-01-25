# ándaga
![andaga](media/andaga.png)

##### [Code for version 1](https://github.com/ckipp01/andaga-cli/tree/year-one)
##### [Code for version 2 cli](https://github.com/ckipp01/andaga-cli)
##### [Code for version 2 core](https://github.com/ckipp01/andaga-core)

On January 1, 2018 I decided to make an effort to log all of my free time for a
year. I was inspired and intrigued by multiple other time trackers such as
[Horaire](https://wiki.xxiivv.com/#horaire) by Devine Lu Linvega and
[Færeld](https://hraew.autophagy.io/faereld) by Mika Naylor. I originally split
my time up into 4 categories: act, learn, rest and social. I logged a total of
36,880 minutes spread across 578 logs. The time tracked was limited to only time
that I had 100% control over, besides time spent with my spouse. I was curious
to find trends, get insights, and to simply see if I was able to do the act of
logging for an entire year

The app was a command line application written in Node and had 6 main commands.

 - andaga `log` used for logging new entries
 - andaga `list` used for listing your entries
 - andaga `tell` used for telling your totals
 - andaga `populate` used for populating your SQLite database from a JSON file
 - andaga `backup` used for backing up your entries to a JSON file
 - andaga `show` used to bring up a dashboard with statistics on your entries

While I did learn some things through the tracking, the main lesson I learned
was more about the process of how I want to use and build tools for my own use.
This was one of the first projects that I fully built for myself and used on a
daily basis. I realized that I often forgot to log entries either because I
didn't like logging that type of entry, social for example, or I would simply
forget. Again, this taught me about the type of software I want to both build
and use for myself -- one that is simple to understand, easy to use, and
flexible both in data format and code. I assume the way I implement this moving
forward will continually change. That's where the flexibility comes into play.
What exactly it tracks is also continually changing. Many of these factors were
taken into account as I began work on version 2 of the project.

Starting in 2019, I split this project up into 2 parts
 - andaga-cli, which is a small command line app written in Node. Instead of
   storing the entries locally, they send them to ándaga-core to be stored.

 - ándaga-core, which is a serverless Node app hosted on [Zeit](http://zeit.co),
   which will store my entries in a MongoDB database.

The aim for version 2 is largely the same as version 1, but a few details have
changed. I'm no longer tracking social and rest time. The whole idea of
everything fitting into 4 categories has been thrown out. There will now be no
limit on the amount of categories there can be. Also, I'm only tracking the time
I spend on personal projects. This can range from building something, learning
language, or studying programming paradigms. Hopefully this will give me insight
into when I'm productive, when I typically have more energy to study, and what I
enjoy working on. My hope if to make this obvious as I build more data
visualization into chronica.
