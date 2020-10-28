import React, { useMemo } from "react"
import { MdxFrontmatterIngredients } from "../../gatsby-graphql"

const Ingredient: React.FC<MdxFrontmatterIngredients> = ({
  amount,
  unit,
  name,
}) => <li className="m-0 ">{`${amount} ${unit} ${name}`}</li>

interface IngredientsProps {
  ingredients: MdxFrontmatterIngredients[]
  steps?: string[]
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients, steps }) => {
  const steppedIngredients = useMemo(
    () =>
      steps &&
      steps?.map((step, index) => ({
        name: step,
        ingredients: ingredients.filter(
          (ingredient) => ingredient.step === index + 1
        ),
      })),
    [ingredients, steps]
  )

  return (
    <>
      {ingredients && <h2>Zutaten</h2>}
      {(steppedIngredients || ([{ name: false, ingredients }] as any)).map(
        (step) => (
          <section id="ingredients">
            {step.name && <h3>{step.name}</h3>}
            <ul className="list-none">
              {step.ingredients.map((ingredient) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Ingredient {...ingredient} />
              ))}
            </ul>
          </section>
        )
      )}
    </>
  )
}

export default Ingredients
