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

    val (recs, _) = topicDetails.foldLeft(("", 0.0)) { (acc, next) =>
      val rec = s"""<rect width="${next.percentage}%" height="20" x="${acc._2}%" class="${next.category}"/>"""
      (acc._1 + rec, acc._2 + next.percentage)
    }

    s"""
       | ${logs.filter(_.project == topic).length}
       | <svg width="100%" height="20">
       |  $recs
       | </svg>
       |""".stripMargin
  }
}
