import Link from "next/link";
import { ChevronLeft } from "react-feather";
import Layout from "../components/Layout";

export default function HelpPage() {
  return (
    <Layout title="Help">
      <div className="p-4 h-10 bg-gray-100 items-center flex">
        <Link href="/">
          <a className="inline-flex">
            <ChevronLeft /> <span>Back</span>
          </a>
        </Link>
      </div>
      <div
        className="p-6 overflow-y-auto w-full"
        style={{ height: "calc(100% - 3rem)" }}
      >
        <div className="prose">
          <h3>Expression Syntax</h3>
          <p>
            The parser accepts a pretty basic grammar. It’s similar to normal
            JavaScript
            <br />
            expressions, but is more math-oriented. For example, the{" "}
            <code>^</code> operator is
            <br />
            exponentiation, not xor.
          </p>

          <h4>Operator Precedence</h4>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Operator</th>
                <th style={{ textAlign: "left" }}>Associativity</th>
                <th style={{ textAlign: "left" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>(…)</td>
                <td style={{ textAlign: "left" }}>None</td>
                <td style={{ textAlign: "left" }}>Grouping</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>f(), x.y, a[i]</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>
                  Function call, property access, array indexing
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>!</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>Factorial</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>^</td>
                <td style={{ textAlign: "left" }}>Right</td>
                <td style={{ textAlign: "left" }}>Exponentiation</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>+, -, not, sqrt, etc.</td>
                <td style={{ textAlign: "left" }}>Right</td>
                <td style={{ textAlign: "left" }}>
                  Unary prefix operators (see below for the full list)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>*, /, %</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>
                  Multiplication, division, remainder
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>+, -, ||</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>
                  Addition, subtraction, array/list concatenation
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  ==, !=, &gt;=, &lt;=, &gt;, &lt;, in
                </td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>
                  Equals, not equals, etc. “in” means “is the left operand
                  included in the right array operand?”
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>and</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>Logical AND</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>or</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>Logical OR</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>x ? y : z</td>
                <td style={{ textAlign: "left" }}>Right</td>
                <td style={{ textAlign: "left" }}>
                  Ternary conditional (if x then y else z)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>=</td>
                <td style={{ textAlign: "left" }}>Right</td>
                <td style={{ textAlign: "left" }}>Variable assignment</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>;</td>
                <td style={{ textAlign: "left" }}>Left</td>
                <td style={{ textAlign: "left" }}>Expression separator</td>
              </tr>
            </tbody>
          </table>

          <h4>Unary operators</h4>
          <p>
            The parser has several built-in “functions” that are actually unary
            operators.
            <br />
            The primary difference between these and functions are that they can
            only accept
            <br />
            exactly one argument, and parentheses are optional. With
            parentheses, they have
            <br />
            the same precedence as function calls, but without parentheses, they
            keep their
            <br />
            normal precedence (just below <code>^</code>). For example,{" "}
            <code>sin(x)^2</code> is equivalent to
            <br />
            <code>(sin x)^2</code>, and <code>sin x^2</code> is equivalent to{" "}
            <code>sin(x^2)</code>.
          </p>
          <p>
            The unary <code>+</code> and <code>-</code> operators are an
            exception, and always have their normal
            <br />
            precedence.
          </p>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Operator</th>
                <th style={{ textAlign: "left" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>-x</td>
                <td style={{ textAlign: "left" }}>Negation</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>+x</td>
                <td style={{ textAlign: "left" }}>
                  Unary plus. This converts it’s operand to a number, but has no
                  other effect.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>x!</td>
                <td style={{ textAlign: "left" }}>
                  Factorial (x * (x-1) * (x-2) * … * 2 * 1). gamma(x + 1) for
                  non-integers.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>abs x</td>
                <td style={{ textAlign: "left" }}>
                  Absolute value (magnitude) of x
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>acos x</td>
                <td style={{ textAlign: "left" }}>
                  Arc cosine of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>acosh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic arc cosine of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>asin x</td>
                <td style={{ textAlign: "left" }}>
                  Arc sine of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>asinh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic arc sine of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>atan x</td>
                <td style={{ textAlign: "left" }}>
                  Arc tangent of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>atanh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic arc tangent of x (in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>cbrt x</td>
                <td style={{ textAlign: "left" }}>Cube root of x</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>ceil x</td>
                <td style={{ textAlign: "left" }}>
                  Ceiling of x — the smallest integer that’s &gt;= x
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>cos x</td>
                <td style={{ textAlign: "left" }}>
                  Cosine of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>cosh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic cosine of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>exp x</td>
                <td style={{ textAlign: "left" }}>
                  e^x (exponential/antilogarithm function with base e)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>expm1 x</td>
                <td style={{ textAlign: "left" }}>e^x - 1</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>floor x</td>
                <td style={{ textAlign: "left" }}>
                  Floor of x — the largest integer that’s &lt;= x
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>length x</td>
                <td style={{ textAlign: "left" }}>
                  String or array length of x
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>ln x</td>
                <td style={{ textAlign: "left" }}>Natural logarithm of x</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>log x</td>
                <td style={{ textAlign: "left" }}>
                  Natural logarithm of x (synonym for ln, not base-10)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>log10 x</td>
                <td style={{ textAlign: "left" }}>Base-10 logarithm of x</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>log2 x</td>
                <td style={{ textAlign: "left" }}>Base-2 logarithm of x</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>log1p x</td>
                <td style={{ textAlign: "left" }}>
                  Natural logarithm of (1 + x)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>not x</td>
                <td style={{ textAlign: "left" }}>Logical NOT operator</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>round x</td>
                <td style={{ textAlign: "left" }}>
                  X, rounded to the nearest integer, using “grade-school
                  rounding”
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>sign x</td>
                <td style={{ textAlign: "left" }}>
                  Sign of x (-1, 0, or 1 for negative, zero, or positive
                  respectively)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>sin x</td>
                <td style={{ textAlign: "left" }}>
                  Sine of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>sinh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic sine of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>sqrt x</td>
                <td style={{ textAlign: "left" }}>
                  Square root of x. Result is NaN (Not a Number) if x is
                  negative.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>tan x</td>
                <td style={{ textAlign: "left" }}>
                  Tangent of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>tanh x</td>
                <td style={{ textAlign: "left" }}>
                  Hyperbolic tangent of x (x is in radians)
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>trunc x</td>
                <td style={{ textAlign: "left" }}>
                  Integral part of a X, looks like floor(x) unless for negative
                  number
                </td>
              </tr>
            </tbody>
          </table>
          <h4>Pre-defined functions</h4>
          <p>
            Besides the “operator” functions, there are several pre-defined
            functions. You
            <br />
            can provide your own, by binding variables to normal JavaScript
            functions.
            <br />
            These are not evaluated by simplify.
          </p>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Function</th>
                <th style={{ textAlign: "left" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>random(n)</td>
                <td style={{ textAlign: "left" }}>
                  Get a random number in the range [0, n). If n is zero, or not
                  provided, it defaults to 1.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>fac(n)</td>
                <td style={{ textAlign: "left" }}>
                  n! (factorial of n: “n * (n-1) * (n-2) * … * 2 * 1”)
                  Deprecated. Use the ! operator instead.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>min(a,b,…)</td>
                <td style={{ textAlign: "left" }}>
                  Get the smallest (minimum) number in the list.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>max(a,b,…)</td>
                <td style={{ textAlign: "left" }}>
                  Get the largest (maximum) number in the list.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>hypot(a,b)</td>
                <td style={{ textAlign: "left" }}>
                  Hypotenuse, i.e. the square root of the sum of squares of its
                  arguments.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>pyt(a, b)</td>
                <td style={{ textAlign: "left" }}>Alias for hypot.</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>pow(x, y)</td>
                <td style={{ textAlign: "left" }}>
                  Equivalent to x^y. For consistency with JavaScript’s Math
                  object.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>atan2(y, x)</td>
                <td style={{ textAlign: "left" }}>
                  Arc tangent of x/y. i.e. the angle between (0, 0) and (x, y)
                  in radians.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>roundTo(x, n)</td>
                <td style={{ textAlign: "left" }}>
                  Rounds x to n places after the decimal point.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>map(f, a)</td>
                <td style={{ textAlign: "left" }}>
                  Array map: Pass each element of <code>a</code> the function{" "}
                  <code>f</code>, and return an array of the results.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>fold(f, y, a)</td>
                <td style={{ textAlign: "left" }}>
                  Array fold: Fold/reduce array <code>a</code> into a single
                  value,
                  <code>y</code> by setting <code>y = f(y, x, index)</code> for
                  each element <code>x</code> of the array.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>filter(f, a)</td>
                <td style={{ textAlign: "left" }}>
                  Array filter: Return an array containing only the values from{" "}
                  <code>a</code>
                  where <code>f(x, index)</code> is <code>true</code>.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>indexOf(x, a)</td>
                <td style={{ textAlign: "left" }}>
                  Return the first index of string or array <code>a</code>{" "}
                  matching the value
                  <code>x</code>, or <code>-1</code> if not found.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>join(sep, a)</td>
                <td style={{ textAlign: "left" }}>
                  Concatenate the elements of <code>a</code>, separated by{" "}
                  <code>sep</code>.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>if(c, a, b)</td>
                <td style={{ textAlign: "left" }}>
                  Function form of c ? a : b. Note: This always evaluates both{" "}
                  <code>a</code>
                  and <code>b</code>, regardless of whether <code>c</code> is{" "}
                  <code>true</code> or not. Use
                  <code>c ? a : b</code> instead if there are side effects, or
                  if evaluating the branches could be expensive.
                </td>
              </tr>
            </tbody>
          </table>

          <h4>Constants</h4>
          <p>
            The parser also includes a number of pre-defined constants that can
            be used in expressions. These are shown
            <br />
            in the table below:
          </p>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Constant</th>
                <th style={{ textAlign: "left" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>E</td>
                <td style={{ textAlign: "left" }}>
                  The value of <code>Math.E</code> from your JavaScript runtime
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>PI</td>
                <td style={{ textAlign: "left" }}>
                  The value of <code>Math.PI</code> from your JavaScript runtime
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>true</td>
                <td style={{ textAlign: "left" }}>
                  Logical <code>true</code> value
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>false</td>
                <td style={{ textAlign: "left" }}>
                  Logical <code>false</code> value
                </td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
      </div>
    </Layout>
  );
}
