import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox'
import { withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate-common'
import {
  useTodoListElement,
  useTodoListElementState,
} from '@udecode/plate-list'
import { Icons } from '../icons'

export const TodoListElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const { element } = props
    const state = useTodoListElementState({ element })
    const { checkboxProps } = useTodoListElement(state)

    return (
      <PlateElement
        {...props}
        ref={ref}
        data-checked={state.checked}
      >
        <Checkbox {...checkboxProps} contentEditable={false} className="checkbox">
          <CheckboxIndicator className="checkbox-indicator">
            <Icons.check className="checkbox-icon" />
          </CheckboxIndicator>
        </Checkbox>

        <span
          className="content"
          contentEditable={!state.readOnly}
          suppressContentEditableWarning
        >
          {children}
        </span>
      </PlateElement>
    )
  },
)
