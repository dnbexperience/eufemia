import { H4, ScrollView, Table } from '@dnb/eufemia/src'
import properties from '@dnb/eufemia/src/style/themes/ui/properties'
import styles from './ColorReference.module.scss'

export function ChartColors() {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  return (
    <div className={styles['dnb-chart-palette']}>
      {[
        'gray',
        'red',
        'green',
        'orange',
        'blue',
        'teal',
        'yellow',
        'purple',
      ].map((family) => (
        <section key={family}>
          <H4 size="small" top={0}>
            {family.charAt(0).toUpperCase() + family.slice(1)}
          </H4>
          <code>{'--chart-color-' + family + '-{step}'}</code>
          <ScrollView
            interactive="auto"
            aria-label={family + ' chart colors'}
          >
            <ul>
              {steps.map((step) => {
                const name = '--chart-color-' + family + '-' + step
                return (
                  <li key={step} title={name}>
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: 'var(' + name + ')' }}
                    />
                    <span>{step}</span>
                    <span>
                      {properties[name as keyof typeof properties]}
                    </span>
                  </li>
                )
              })}
            </ul>
          </ScrollView>
        </section>
      ))}
    </div>
  )
}

export function ChartRoleColors() {
  return (
    <Table.ScrollView aria-label="DNB chart color roles">
      <Table size="small" className={styles['dnb-chart-roles']}>
        <caption className="dnb-sr-only">DNB chart color roles</caption>
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">CSS custom property</th>
            <th scope="col">Hex value</th>
          </tr>
        </thead>
        {['primary', 'secondary', 'tertiary', 'negative'].map((role) => (
          <tbody key={role}>
            {['solid', 'outline-fill', 'outline-stroke'].map(
              (variant, index) => {
                const name = '--chart-color-' + role + '-' + variant
                return (
                  <tr key={variant}>
                    {index === 0 && (
                      <th scope="rowgroup" rowSpan={3}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </th>
                    )}
                    <td>
                      <span
                        className={styles['dnb-chart-roles__property']}
                      >
                        <span
                          className={styles['dnb-chart-roles__swatch']}
                          aria-hidden="true"
                          style={{
                            backgroundColor: 'var(' + name + ')',
                            borderColor:
                              'var(--chart-color-' +
                              role +
                              '-outline-stroke)',
                          }}
                        />
                        <code>{name}</code>
                      </span>
                    </td>
                    <td>{properties[name as keyof typeof properties]}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        ))}
      </Table>
    </Table.ScrollView>
  )
}
