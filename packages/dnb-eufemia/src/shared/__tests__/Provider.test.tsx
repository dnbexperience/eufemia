/**
 * Provider/Context Tests
 *
 */

import React from 'react'

import ToggleButton from '../../components/toggle-button/ToggleButton'
import Timeline from '../../components/timeline/Timeline'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import DatePicker from '../../components/date-picker/DatePicker'
import Anchor from '../../components/anchor/Anchor'
import GlobalStatus from '../../components/global-status/GlobalStatus'
import GlobalError from '../../components/global-error/GlobalError'
import ProgressIndicator from '../../components/progress-indicator/ProgressIndicator'
import Dropdown from '../../components/dropdown/Dropdown'
import Autocomplete from '../../components/autocomplete/Autocomplete'
import Modal from '../../components/modal/Modal'
import Dialog from '../../components/dialog/Dialog'
import CopyOnClick from '../../components/copy-on-click/CopyOnClick'
import NumberFormat from '../../components/number-format/NumberFormat'
import HelpButton from '../../components/help-button/HelpButton'
import Input from '../../components/input/Input'
import Pagination from '../../components/pagination/Pagination'
import Skeleton from '../../components/skeleton/Skeleton'
import StepIndicator from '../../components/step-indicator/StepIndicator'
import Slider from '../../components/slider/Slider'
import Tag from '../../components/tag/Tag'
import Table from '../../components/table/Table'
import Upload from '../../components/upload/Upload'

import Th from '../../components/table/TableTh'
import Td from '../../components/table/TableTd'
import Tr from '../../components/table/TableTr'

import PaymentCard from '../../extensions/payment-card/PaymentCard'

import TextCounter from '../../fragments/text-counter/TextCounter'

import P from '../../elements/P'

import Context, {
  ContextProps,
  TranslationFlat,
  Translations,
} from '../Context'
import Provider, { ProviderProps } from '../Provider'
import { fireEvent, render } from '@testing-library/react'

describe('Provider', () => {
  describe('translations', () => {
    const title_nb = 'Tekst'
    const title_gb = 'Text'

    const nbNO: TranslationFlat = {
      'HelpButton.title': title_nb,
    }
    const enGB: TranslationFlat = {
      'HelpButton.title': title_gb,
    }

    const defaultTranslations: Translations = {
      'nb-NO': nbNO,
      'en-GB': enGB,
    }

    const LocalProvider = (props: ProviderProps) => {
      return <Provider translations={defaultTranslations} {...props} />
    }

    const ChangeLocale = () => {
      const { setLocale, locale } = React.useContext(Context)

      expect(typeof setLocale).toBe('function')

      return (
        <ToggleButton.Group
          value={locale}
          on_change={({ value }) => {
            setLocale(value)
          }}
        >
          <ToggleButton value="nb-NO" className="nb-NO">
            nb-NO
          </ToggleButton>
          <ToggleButton value="en-GB" className="en-GB">
            en-GB
          </ToggleButton>
          <ToggleButton value="en-US" className="en-US">
            en-US
          </ToggleButton>
        </ToggleButton.Group>
      )
    }

    const MagicProvider = ({
      children = null,
      ...props
    }: Partial<ProviderProps>) => {
      return (
        <LocalProvider {...props}>
          <Context.Consumer>
            {(context) => {
              const title = context.translation.HelpButton.title
              return (
                <>
                  <p>{title}</p>
                  <ChangeLocale />
                  {children}
                </>
              )
            }}
          </Context.Consumer>
        </LocalProvider>
      )
    }

    it('should translate component strings', () => {
      const { rerender } = render(
        <LocalProvider>
          <HelpButton>content</HelpButton>
        </LocalProvider>
      )

      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-label')
      ).toBe(title_nb)
      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-roledescription')
      ).toBe('Hjelp-knapp')

      rerender(
        <LocalProvider locale="en-GB">
          <HelpButton>content</HelpButton>
        </LocalProvider>
      )

      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-label')
      ).toBe(title_gb)
      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-roledescription')
      ).toBe('Help button')
    })

    it('should react on prop change', () => {
      const { rerender } = render(<MagicProvider />)

      expect(document.querySelector('p').textContent).toBe(title_nb)

      rerender(<MagicProvider locale="en-GB" />)

      expect(document.querySelector('p').textContent).toBe(title_gb)
    })

    it('should react on locale change', () => {
      render(<MagicProvider />)

      expect(document.querySelector('p').textContent).toBe(title_nb)

      fireEvent.click(document.querySelector('.en-GB button'))

      expect(document.querySelector('p').textContent).toBe(title_gb)

      fireEvent.click(document.querySelector('.en-US button'))

      expect(document.querySelector('p').textContent).toBe(title_gb)

      fireEvent.click(document.querySelector('.nb-NO button'))

      expect(document.querySelector('p').textContent).toBe(title_nb)
    })

    it('should support nested providers handling locales', () => {
      render(
        <MagicProvider locale="nb-NO">
          <MagicProvider locale="en-GB" />
        </MagicProvider>
      )

      const getRootElement = () => document.querySelectorAll('p')[0]
      const getNestedElement = () => document.querySelectorAll('p')[1]
      const switchRootTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
      }
      const switchNestedTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
      }

      expect(getRootElement().textContent).toBe(title_nb)
      expect(getNestedElement().textContent).toBe(title_gb)

      switchNestedTo('nb-NO')

      expect(getNestedElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // should not have changed
      expect(getRootElement().textContent).toBe(title_nb)

      switchRootTo('en-GB')

      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getRootElement().textContent).toBe(title_gb)

      switchRootTo('en-US')

      expect(
        document
          .querySelectorAll('.en-US button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getRootElement().textContent).toBe(title_gb)

      // should not have changed
      expect(getNestedElement().textContent).toBe(title_nb)
    })

    it('should inherit locale in nested providers', () => {
      const locale = 'nb-NO'
      let receivedLocale = null

      const Consumer = () => {
        receivedLocale = React.useContext(Context).locale
        return null
      }

      render(
        <MagicProvider locale="nb-NO">
          <MagicProvider>
            <Consumer />
          </MagicProvider>
        </MagicProvider>
      )

      expect(receivedLocale).toBe(locale)
      expect(document.querySelectorAll('p')[0].textContent).toBe(title_nb)
    })

    it('should change locale in root context', () => {
      const Consumer = ({ id }) => {
        const context = React.useContext(Context)
        const { locale, setLocale } = context

        const handleOnChange = () => {
          setLocale(locale === 'nb-NO' ? 'en-GB' : 'nb-NO')
        }

        return (
          <>
            <p id={id + '-locale'}>{locale}</p>
            <button id={id + '-button'} onClick={handleOnChange}>
              change
            </button>
          </>
        )
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      render(
        <Provider locale="nb-NO">
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('root-button'))

      expect(getRootLocale()).toBe('en-GB')
      expect(getNestedLocale()).toBe('en-GB')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')
    })

    it('should change locale in local context', () => {
      const Consumer = ({ id }) => {
        const context = React.useContext(Context)
        const { locale, setCurrentLocale } = context

        const handleOnChange = () => {
          setCurrentLocale(locale === 'nb-NO' ? 'en-GB' : 'nb-NO')
        }

        return (
          <>
            <p id={id + '-locale'}>{locale}</p>
            <button id={id + '-button'} onClick={handleOnChange}>
              change
            </button>
          </>
        )
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      render(
        <Provider locale="nb-NO">
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('en-GB')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('root-button'))

      expect(getRootLocale()).toBe('en-GB')
      expect(getNestedLocale()).toBe('nb-NO')
    })

    it('will support "value" prop in nested contexts', () => {
      type ConsumerContext = {
        myProperty: string
      }

      const Consumer = ({ id }) => {
        const context = React.useContext<
          ContextProps & Partial<ConsumerContext>
        >(Context)

        return <p id={id + '-locale'}>{context.myProperty}</p>
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      const { rerender } = render(
        <Provider value={{ myProperty: 'bar' }}>
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('bar')
      expect(getNestedLocale()).toBe('bar')

      const value: ConsumerContext = { myProperty: 'changed' }

      rerender(
        <Provider value={value}>
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      expect(getRootLocale()).toBe('changed')
      expect(getNestedLocale()).toBe('changed')
    })

    it('should support nested providers and update the root context', () => {
      render(
        <MagicProvider locale="en-GB">
          <MagicProvider locale="nb-NO" />
        </MagicProvider>
      )

      const getRootElement = () => document.querySelectorAll('p')[0]
      const getNestedElement = () => document.querySelectorAll('p')[1]
      const switchRootTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
      }
      const switchNestedTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
      }

      expect(getRootElement().textContent).toBe(title_gb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // First, let's change the inner
      switchNestedTo('nb-NO')

      expect(getRootElement().textContent).toBe(title_gb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      switchNestedTo('en-GB')

      expect(getRootElement().textContent).toBe(title_gb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(title_gb)
      expect(
        document
          .querySelectorAll('.en-GB button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      switchNestedTo('nb-NO')

      expect(getRootElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // Now, let's change the outer
      switchRootTo('en-GB')

      expect(getRootElement().textContent).toBe(title_gb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(title_nb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')
    })

    it('should support custom locale like sv-SE', () => {
      render(
        <Provider
          locale="sv-SE"
          translations={{
            'sv-SE': {
              TextCounter: {
                characterDown: '%count av %max tecken kvar.',
                characterUp: 'Du har använt %count av %max tecken.',
                characterExceeded: '%count tecken över gränsen på %max.',
              },
              TimelineItem: {
                alt_label_completed: 'Slutförd',
                alt_label_current: 'Aktuell',
                alt_label_upcoming: 'Kommande',
              },
              Breadcrumb: {
                navText: 'Sidhierarki',
                goBackText: 'Tillbaka',
                homeText: 'Hem',
                backToText: 'Tillbaka till...',
              },
              DatePicker: {
                day: 'dag',
                month: 'månad',
                year: 'år',
                start: 'från',
                end: 'till',
                selectedDate: 'Valt datum: %s',
                selectedMonth: 'Vald månad %s',
                selectedYear: 'Valt år %s',
                nextMonth: 'Nästa månad %s',
                prevMonth: 'Förra månaden %s',
                nextYear: 'Nästa år %s',
                prevYear: 'Förra året %s',
                openPickerText: 'öppna datumväljaren',
                maskOrder: 'dd/mm/yyyy',
                maskPlaceholder: 'dd.mm.åååå',
                dateFormat: 'yyyy-MM-dd',
                returnFormat: 'yyyy-MM-dd',
                submitButtonText: 'Okej',
                cancelButtonText: 'Stänga',
                resetButtonText: 'Återställa',
                placeholderCharacters: {
                  day: 'd',
                  month: 'm',
                  year: 'å',
                },
                // TODO: add firstDay
              },
              Anchor: {
                targetBlankTitle: 'Öppnar ett nytt fönster',
              },
              GlobalStatus: {
                default_title: 'Ett fel har inträffat',
                close_text: 'Stäng',
                status_anchor_text: 'Gå till %s',
              },
              GlobalError: {
                404: {
                  title: 'Vi kan inte hitta sidan du letar efter...',
                  text: 'Är du säker på att du har skrivit rätt adress? Eller har vi bråkat med länkarna?',
                },
                500: {
                  title: 'Förlåt, något gick fel här!',
                  text: 'Tjänsten fungerar inte som den ska för tillfället, men försök igen senare.',
                },
                code: 'Felmeddelandekod:',
                help: 'Här är några länkar som kan hjälpa:',
              },
              ProgressIndicator: {
                indicator_label: 'Vänta...',
              },
              Dropdown: {
                title: 'Valmenyn',
              },
              Autocomplete: {
                title: 'Skriv och välj',
                submit_button_title: 'Visa alternativ',
                no_options: 'Inga alternativ',
                show_all: 'Visa alla',
                show_options_sr:
                  'Bläddra bland alternativ, stäng med esc-tangenten',
                aria_live_options: '%s alternativ',
                selected_sr: 'Vald:',
                indicator_label: 'Hämtar data ...',
              },
              Modal: {
                dialog_title: 'Separat fönster',
                close_title: 'Stäng',
              },
              Dialog: {
                declineText: 'Avbryt',
                confirmText: 'Acceptera',
              },
              CopyOnClick: {
                clipboard_copy: 'Kopierade',
              },
              NumberFormat: {
                clipboard_copy: 'Kopierat',
                not_available: 'Inte tillgängligt',
              },
              HelpButton: {
                title: 'Hjälptext',
                aria_role: 'Hjälpknapp',
              },
              Input: {
                submit_button_title: 'Skicka knapp',
                clear_button_title: 'Återställ',
              },
              Pagination: {
                button_title: 'Sida %s',
                next_title: 'Nästa sida',
                prev_title: 'Föregående sida',
                more_pages: '%s fler sidor',
                is_loading_text: 'Laddar nytt innehåll',
                load_button_text: 'Visa mer innehåll',
              },
              Skeleton: {
                aria_busy: 'Bearbetar data ...',
                aria_ready: 'Redo att interagera',
              },
              StepIndicator: {
                overview_title: 'Stegöversikt',
                step_title_extended: 'Du är på steg %step av %count',
                step_title: 'Steg %step av %count',
              },
              Slider: {
                addTitle: 'Öka (%s)',
                subtractTitle: 'Subtrahera (%s)',
              },
              PaymentCard: {
                text_card_number: 'Kortnummer',
                text_expired: 'Utgånget',
                text_blocked: 'Blockerad',
                text_not_active: 'Inte aktiverad',
                text_order_in_process: 'I process',
                text_renewed: 'Förnyad',
                text_replaced: 'Bytts ut',
                text_unknown: 'Okänd',
              },
              Tag: {
                removeIconTitle: 'Ta bort',
                addIconTitle: 'Lägg till',
              },
              Table: {
                accordionToggleButtonSR: 'Visa mer innehåll',
                accordionMoreContentSR: 'Mer innehåll på nästa rad',
                navigationButtonSR: 'Navigera till mer innehåll',
              },
              Upload: {
                title: 'Ladda upp dokument',
                text: 'Dra och släpp eller välj vilka filer du vill ladda upp.',
                textSingular:
                  'Dra och släpp eller välj vilken fil du vill ladda upp.',
                fileTypeTableCaption:
                  'Tillåtna filformat och max filstorlek',
                fileTypeDescription: 'Tillåtna filformat:',
                fileSizeDescription: 'Max filstorlek:',
                fileAmountDescription: 'Max antal filer:',
                fileSizeContent: '%size MB',
                buttonText: 'Välj filer',
                buttonTextSingular: 'Välj fil',
                loadingText: 'Lastar',
                errorLargeFile:
                  'Filen du försöker ladda upp är för stor, den maximala storleken som stöds är %size MB.',
                errorAmountLimit:
                  'Antalet filer du kan ladda upp är begränsat (%amount).',
                errorUnsupportedFile:
                  'Filen du försöker ladda upp stöds inte.',
                deleteButton: 'Radera',
                fileListAriaLabel: 'uppladdade filer',
              },
            },
          }}
        >
          <TextCounter variant="down" text="test" max={10} />
          <Timeline
            data={[
              {
                title: 'Completed event',
                subtitle: '10. september 2021',
                state: 'completed',
              },
            ]}
          />
          <Breadcrumb />
          <DatePicker opened />
          <Anchor href="https://dnb.no/">link to a website</Anchor>
          <GlobalStatus show />
          <GlobalError />
          <ProgressIndicator />
          <Dropdown data={['data']} />
          <Autocomplete data={['data']} />
          <Modal>Text</Modal>
          <Dialog>Text</Dialog>
          <CopyOnClick>Text</CopyOnClick>
          <NumberFormat value="12345" />
          <HelpButton>Text</HelpButton>
          <Pagination
            page_count={888}
            current_page={4}
            on_change={({ pageNumber }) => {
              console.log('on_change:', pageNumber)
            }}
          >
            <P>Current Page Content</P>
          </Pagination>
          <Skeleton show>
            <P>Heading</P>
          </Skeleton>
          <StepIndicator.Sidebar sidebar_id="unique-id-strict" />
          <StepIndicator
            sidebar_id="unique-id-strict"
            mode="strict"
            data={[
              {
                title: 'Velg mottaker',
              },
            ]}
          />
          <Slider />
          <PaymentCard product_code="NK1" card_number="************1337" />
          <Tag.Group label="Interactable tags">
            <Tag>Tag</Tag>
          </Tag.Group>
          <Table>
            <caption className="dnb-sr-only">A Table Caption</caption>
            <thead>
              <Tr>
                <Th>Column</Th>
                <Th>
                  <Th.Horizontal>
                    Help Button
                    <Th.HelpButton>Help Content</Th.HelpButton>
                  </Th.Horizontal>
                </Th>
                <Th sortable>
                  <Th.SortButton
                    text="Sortable Active"
                    title="Sort table column"
                  />
                </Th>
                <Th sortable align="right">
                  <Th.SortButton
                    text="Sortable"
                    title="Sort table column"
                  />
                </Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td align="right">Row 1</Td>
              </Tr>
              <Tr>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td align="right">Row 2</Td>
              </Tr>
              <Tr>
                <Td>
                  <P>Row 3 with paragraph</P>
                </Td>
                <Td>Row 3 with text</Td>
                <Td>
                  <P>
                    Row 3 with <b>medium paragraph</b>
                  </P>
                </Td>
                <Td align="right">
                  Row 3 with <b>medium text</b>
                </Td>
              </Tr>
            </tbody>
          </Table>
          <Upload acceptedFileTypes={['jpg', 'png']} />
        </Provider>
      )
      expect(true).toBe(true)
    })
  })
})
