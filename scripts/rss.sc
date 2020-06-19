import $file.domain, domain.{Page}
import java.time.Instant

def generateRss(pages: Seq[Page]) = {

  /**
    * This should always have a date, but on the off chance that import
    * doesn't, just give it today's date.
    */
  val newest = pages.headOption
    .flatMap(_.metadata.flatMap(_.date))
    .getOrElse(Instant.now().toString())

  <rss version="2.0">
     <channel>
       <title>chris-kipp.io Blog</title>
       <link>https://chris-kipp.io/blog</link>
       <description>A blog about tech. Mostly Scala, tooling, Vim, and other things.</description>
       <language>en-us</language>
       <category>Blog</category>
       <lastBuildDate>{newest}</lastBuildDate>
       {
    pages.flatMap { page =>
      val title = page.metadata.flatMap(_.title)
      title.map { title =>
        val link =
          s"https://chris-kipp.io/blog/${title.toLowerCase.replace(" ", "-")}"
        <item>
               <title>{title}</title>
               <description>{page.metadata.flatMap(_.description).getOrElse("")}</description>
               <link>{link}</link>
          <author>Chris Kipp</author>
          <category>Blog</category>
          <guid isPermaLink="true">{link}</guid>
          <pubDate>{page.metadata.flatMap(_.date).getOrElse("")}</pubDate>
             </item>
      }
    }
  }
     </channel>
   </rss>

}
