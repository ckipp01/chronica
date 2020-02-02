import $ivy.{`org.scalameta::mdoc:2.1.1`}
import $file.data, data.Log

import mdoc.Reporter
import mdoc.StringModifier

import scala.meta.inputs.Input

class PercentageGenerator(logs: List[Log]) extends StringModifier {
  override val name: String = "percentages"

  override def process(
    info: String,
    code: Input,
    reporter: Reporter
  ): String = {
    s"""
    | $info
    |""".stripMargin
  }
}
