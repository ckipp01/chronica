import $ivy.`com.lihaoyi::ujson:1.1.0`

case class Log(
    date: String,
    category: String,
    time: Int,
    project: String,
    tags: Option[List[String]]
)

object Log {
  def apply(json: ujson.Value): Log =
    Log(
      json.obj("date").str,
      json.obj("category").str,
      json.obj("time").num.toInt,
      json.obj("project").str,
      json.obj
        .get("tags")
        .map(_.arr.map(_.str).toList)
    )
}

case class Metadata(title: Option[String], date: Option[String])

case class Page(
    name: String,
    content: String,
    metadata: Option[Metadata]
) extends Ordered[Page] {

  /**
    * Used to ensure that the blogs are ordered by
    * newest first
    */
  def compare(that: Page): Int = {
    for {
      thisMeta <- this.metadata
      thisDate <- thisMeta.date
      thatMeta <- that.metadata
      thatDate <- thatMeta.date
    } yield {
      if (thisDate == thatDate) 0
      else if (thisDate < thatDate) 1
      else -1
    }
  }.getOrElse(0)
}

case class TopicDetail(
    topic: String,
    category: String,
    logs: List[Log],
    percentage: Double
)
