case class Log(
    date: String,
    category: String,
    time: Int,
    project: String,
    tags: Option[List[String]]
)

object Log {
  def fromJson(json: ujson.Value) =
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

case class Page(name: String, content: String)

case class TopicDetail(
    topic: String,
    category: String,
    logs: List[Log],
    percentage: Double
)
