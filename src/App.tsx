import { MapBoard } from './components/MapBoard';
import { FilterPanel } from './components/FilterPanel';
import { ResortDrawer } from './components/ResortDrawer';
import { useSkiResorts } from './hooks/useSkiResorts';
import './index.css';

function App() {
  const { 
    resorts, 
    filters, 
    updateFilter, 
    selectedResort, 
    setSelectedResort 
  } = useSkiResorts();

  return (
    <div className="app">
      <FilterPanel 
        filters={filters} 
        updateFilter={updateFilter} 
        count={resorts.length}
      />

      <MapBoard 
        resorts={resorts} 
        onSelectResort={setSelectedResort} 
      />

      <ResortDrawer 
        resort={selectedResort} 
        onClose={() => setSelectedResort(null)} 
      />
    </div>
  );
}

export default App;