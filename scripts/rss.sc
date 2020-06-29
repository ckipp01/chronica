import $file.domain, domain.{Page}
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter

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
        <lastBuildDate>{convertToRFC822(newest)}</lastBuildDate>
       {
         pages.flatMap { page =>
           val title = page.metadata.flatMap(_.title)
           title.map { title =>
             val link =
               s"https://chris-kipp.io/blog/${title.toLowerCase.replace(" ", "-")}"
             <item>
               <title>{title}</title>
               <description>
               {page.content}
               </description>
               <link>{link}</link>
               <author>ckipp@pm.me</author>
               <category>Blog</category>
               <guid isPermaLink="true">{link}</guid>
               <pubDate>
               {
                 convertToRFC822(
                   page.metadata
                     .flatMap(_.date)
                     .getOrElse(LocalDate.now().toString())
                 )
               }
               </pubDate>
             </item>
           }
         }
       }
     </channel>
   </rss>

}

def convertToRFC822(date: String) = {
  val localDate = LocalDate.parse(date)
  val zonedDate = localDate.atStartOfDay(ZoneId.of("Europe/Amsterdam"))
  val targetFormat = DateTimeFormatter.RFC_1123_DATE_TIME
  zonedDate.format(targetFormat)
}
