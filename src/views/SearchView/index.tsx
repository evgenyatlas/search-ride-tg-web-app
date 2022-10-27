import { FoundRidesPanel } from '@/panels/FoundRidesPanel'
import { RidePanel } from '@/panels/RidePanel'
import { SearchRidesPanel } from '@/panels/SearchRidesPanel'
import { Panel, StackPanel, usePanel } from '@/shared/ui/StackPanel'
import style from './SearchView.module.css'

export function SearchView() {
    return (
        <div className={`${style.SearchView}`}>
            <StackPanel>
                <Panel id="search-rides">
                    <SearchRidesPanel />
                </Panel>
                <Panel id="found-rides">
                    <FoundRidesPanel />
                </Panel>
                <Panel id="ride">
                    <RidePanel />
                </Panel>
            </StackPanel>
        </div>
    )
}

