import $ivy.`org.scalameta::mdoc:2.1.1`
import $file.data, data._

import mdoc.Reporter
import mdoc.StringModifier

import scala.meta.inputs.Input

class PercentageGenerator(logs: List[Log]) extends StringModifier {
  override val name: String = "percentages"

  override def process(
      topic: String,
      code: Input,
      reporter: Reporter
  ): String = {
    val topicLogs: List[Log] = logs.filter(_.project == topic)
    val categories = topicLogs.groupBy(_.category)

    val topicDetails: List[TopicDetail] = categories.collect {
      case (cat, logs) =>
        TopicDetail(
          topic,
          cat,
          logs,
          (logs.length.toDouble / topicLogs.length * 100).round
        )
    }.toList

    val (keys, recs, _) = topicDetails.foldLeft(("", "", 0.0)) { (acc, next) =>
      val key =
        s"""|<div class="key-block">
            |  <svg height="10" width="10" class="key-color">
            |    <rect rx="2" width="10" height="10" class="${next.category}" />
            |  </svg>
            |  <p>${next.category} ${next.percentage.toString}%</p>
            |</div>""".stripMargin

      val rec =
        s"""<rect width="${next.percentage}%" height="20" x="${acc._3}%" class="${next.category}"/>"""

      (acc._1 + key, acc._2 + rec, acc._3 + next.percentage)
    }

    s"""
       |<div class="keys-container">
       |  $keys
       |</div>
       |<svg width="100%" height="20">
       |  $recs
       |</svg>
       |""".stripMargin
  }
}
