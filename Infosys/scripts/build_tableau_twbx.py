import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DASHBOARD_DIR = ROOT / "dashboard"
EXCEL_PATH = ROOT / "data" / "processed" / "hospital_final_dataset.xlsx"
CSV_PATH = ROOT / "data" / "processed" / "hospital_cleaned.csv"
TWB_PATH = DASHBOARD_DIR / "medtrack_prototype.twb"
TWBX_PATH = DASHBOARD_DIR / "medtrack_prototype.twbx"

TWB_XML_CONTENT = f"""<?xml version='1.0' encoding='utf-8' ?>
<workbook original-version='18.1' version='18.1' xmlns:user='http://www.tableausoftware.com/xml/user'>
  <document-format-change-manifest>
    <AutoCreateAndUpdateDPIAwareness />
    <SheetIdentifierTracking />
    <WindowsPersistSimpleIdentifiers />
  </document-format-change-manifest>
  <preferences>
    <preference name='ui.encoding' value='UTF-8' />
  </preferences>
  <datasources>
    <datasource caption='Final Dataset' inline='true' name='excel-direct.hospital_final_dataset' version='18.1'>
      <connection class='excel-direct' cleaning='no' compat='no' dataReflection='no' filename='{EXCEL_PATH.as_posix()}' password=''>
        <relation name='Final Dataset' table='[Final Dataset$]' type='table'>
          <columns gridOrigin='A1:AI1501:no:A1:AI1501:0' header='yes' outcome='2'>
            <column name='admission_id' ordinal='0' datatype='string' />
            <column name='patient_id' ordinal='1' datatype='string' />
            <column name='hospital_id' ordinal='2' datatype='string' />
            <column name='hospital_name' ordinal='3' datatype='string' />
            <column name='region' ordinal='4' datatype='string' />
            <column name='city' ordinal='5' datatype='string' />
            <column name='department' ordinal='6' datatype='string' />
            <column name='admission_date' ordinal='7' datatype='date' />
            <column name='discharge_date' ordinal='8' datatype='date' />
            <column name='admission_type' ordinal='9' datatype='string' />
            <column name='discharge_status' ordinal='10' datatype='string' />
            <column name='age' ordinal='11' datatype='integer' />
            <column name='gender' ordinal='12' datatype='string' />
            <column name='insurance_type' ordinal='13' datatype='string' />
            <column name='total_beds' ordinal='14' datatype='integer' />
            <column name='department_bed_capacity' ordinal='15' datatype='integer' />
            <column name='occupied_beds' ordinal='16' datatype='integer' />
            <column name='staff_available' ordinal='17' datatype='integer' />
            <column name='staff_required' ordinal='18' datatype='integer' />
            <column name='equipment_available' ordinal='19' datatype='integer' />
            <column name='equipment_in_use' ordinal='20' datatype='integer' />
            <column name='readmission_flag' ordinal='21' datatype='integer' />
            <column name='length_of_stay_days' ordinal='22' datatype='integer' />
            <column name='admission_month' ordinal='23' datatype='string' />
            <column name='admission_year' ordinal='24' datatype='integer' />
            <column name='admission_quarter' ordinal='25' datatype='string' />
            <column name='bed_utilization_rate' ordinal='26' datatype='real' />
            <column name='equipment_utilization_rate' ordinal='27' datatype='real' />
            <column name='staff_coverage_rate' ordinal='28' datatype='real' />
            <column name='is_readmission' ordinal='29' datatype='integer' />
            <column name='total_admissions' ordinal='30' datatype='integer' />
            <column name='occupancy_rate' ordinal='31' datatype='real' />
            <column name='average_length_of_stay' ordinal='32' datatype='real' />
            <column name='readmission_rate' ordinal='33' datatype='real' />
            <column name='department_efficiency_score' ordinal='34' datatype='real' />
          </columns>
        </relation>
      </connection>
      <aliases enabled='yes' />
      <column caption='Total Admissions' datatype='integer' name='[Calculation_Total_Admissions]' role='measure' type='quantitative'>
        <calculation class='tableau' formula='COUNT([admission_id])' />
      </column>
      <column caption='Occupancy Rate (%)' datatype='real' name='[Calculation_Occupancy_Rate]' role='measure' type='quantitative'>
        <calculation class='tableau' formula='SUM([occupied_beds]) / SUM([department_bed_capacity]) * 100' />
      </column>
      <column caption='Average Length of Stay' datatype='real' name='[Calculation_Avg_LOS]' role='measure' type='quantitative'>
        <calculation class='tableau' formula='AVG([length_of_stay_days])' />
      </column>
      <column caption='Readmission Rate (%)' datatype='real' name='[Calculation_Readmission_Rate]' role='measure' type='quantitative'>
        <calculation class='tableau' formula='SUM([is_readmission]) / COUNT([admission_id]) * 100' />
      </column>
    </datasource>
  </datasources>

  <worksheets>
    <worksheet name='Hospital Overview Sheet'>
      <table>
        <view>
          <datasources>
            <datasource caption='Final Dataset' name='excel-direct.hospital_final_dataset' />
          </datasources>
          <datasource-dependencies datasource='excel-direct.hospital_final_dataset'>
            <column-instance column='[department]' derivation='None' name='[none:department:nk]' pivot='key' type='nominal' />
            <column-instance column='[total_admissions]' derivation='Sum' name='[sum:total_admissions:qk]' pivot='key' type='quantitative' />
            <column datatype='string' name='[department]' role='dimension' type='nominal' />
            <column datatype='integer' name='[total_admissions]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <aggregation value='true' />
        </view>
        <style />
        <panes>
          <pane selection-relaxation-option='selection-relaxation-allow'>
            <view>
              <breakdown value='auto' />
            </view>
            <mark class='automatic' />
            <encodings>
              <color column='[excel-direct.hospital_final_dataset].[none:department:nk]' />
            </encodings>
          </pane>
        </panes>
        <rows>[excel-direct.hospital_final_dataset].[sum:total_admissions:qk]</rows>
        <cols>[excel-direct.hospital_final_dataset].[none:department:nk]</cols>
      </table>
    </worksheet>

    <worksheet name='Patient Flow Sheet'>
      <table>
        <view>
          <datasources>
            <datasource caption='Final Dataset' name='excel-direct.hospital_final_dataset' />
          </datasources>
          <datasource-dependencies datasource='excel-direct.hospital_final_dataset'>
            <column-instance column='[admission_month]' derivation='None' name='[none:admission_month:nk]' pivot='key' type='nominal' />
            <column-instance column='[total_admissions]' derivation='Sum' name='[sum:total_admissions:qk]' pivot='key' type='quantitative' />
            <column datatype='string' name='[admission_month]' role='dimension' type='nominal' />
            <column datatype='integer' name='[total_admissions]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <aggregation value='true' />
        </view>
        <style />
        <panes>
          <pane selection-relaxation-option='selection-relaxation-allow'>
            <view>
              <breakdown value='auto' />
            </view>
            <mark class='automatic' />
          </pane>
        </panes>
        <rows>[excel-direct.hospital_final_dataset].[sum:total_admissions:qk]</rows>
        <cols>[excel-direct.hospital_final_dataset].[none:admission_month:nk]</cols>
      </table>
    </worksheet>

    <worksheet name='Department Analytics Sheet'>
      <table>
        <view>
          <datasources>
            <datasource caption='Final Dataset' name='excel-direct.hospital_final_dataset' />
          </datasources>
          <datasource-dependencies datasource='excel-direct.hospital_final_dataset'>
            <column-instance column='[department]' derivation='None' name='[none:department:nk]' pivot='key' type='nominal' />
            <column-instance column='[department_efficiency_score]' derivation='Avg' name='[avg:department_efficiency_score:qk]' pivot='key' type='quantitative' />
            <column datatype='string' name='[department]' role='dimension' type='nominal' />
            <column datatype='real' name='[department_efficiency_score]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <aggregation value='true' />
        </view>
        <style />
        <panes>
          <pane selection-relaxation-option='selection-relaxation-allow'>
            <view>
              <breakdown value='auto' />
            </view>
            <mark class='automatic' />
          </pane>
        </panes>
        <rows>[excel-direct.hospital_final_dataset].[avg:department_efficiency_score:qk]</rows>
        <cols>[excel-direct.hospital_final_dataset].[none:department:nk]</cols>
      </table>
    </worksheet>

    <worksheet name='Resource Utilization Sheet'>
      <table>
        <view>
          <datasources>
            <datasource caption='Final Dataset' name='excel-direct.hospital_final_dataset' />
          </datasources>
          <datasource-dependencies datasource='excel-direct.hospital_final_dataset'>
            <column-instance column='[hospital_name]' derivation='None' name='[none:hospital_name:nk]' pivot='key' type='nominal' />
            <column-instance column='[occupancy_rate]' derivation='Avg' name='[avg:occupancy_rate:qk]' pivot='key' type='quantitative' />
            <column datatype='string' name='[hospital_name]' role='dimension' type='nominal' />
            <column datatype='real' name='[occupancy_rate]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <aggregation value='true' />
        </view>
        <style />
        <panes>
          <pane selection-relaxation-option='selection-relaxation-allow'>
            <view>
              <breakdown value='auto' />
            </view>
            <mark class='automatic' />
          </pane>
        </panes>
        <rows>[excel-direct.hospital_final_dataset].[avg:occupancy_rate:qk]</rows>
        <cols>[excel-direct.hospital_final_dataset].[none:hospital_name:nk]</cols>
      </table>
    </worksheet>
  </worksheets>

  <dashboards>
    <dashboard name='Hospital Overview'>
      <style />
      <size maxheight='768' maxwidth='1366' minheight='768' minwidth='1366' />
      <zones>
        <zone h='100000' id='1' type-static='layout-basic' w='100000' x='0' y='0'>
          <zone h='98000' id='2' name='Hospital Overview Sheet' w='98000' x='1000' y='1000' />
        </zone>
      </zones>
    </dashboard>
    <dashboard name='Patient Flow'>
      <style />
      <size maxheight='768' maxwidth='1366' minheight='768' minwidth='1366' />
      <zones>
        <zone h='100000' id='1' type-static='layout-basic' w='100000' x='0' y='0'>
          <zone h='98000' id='2' name='Patient Flow Sheet' w='98000' x='1000' y='1000' />
        </zone>
      </zones>
    </dashboard>
    <dashboard name='Department Analytics'>
      <style />
      <size maxheight='768' maxwidth='1366' minheight='768' minwidth='1366' />
      <zones>
        <zone h='100000' id='1' type-static='layout-basic' w='100000' x='0' y='0'>
          <zone h='98000' id='2' name='Department Analytics Sheet' w='98000' x='1000' y='1000' />
        </zone>
      </zones>
    </dashboard>
    <dashboard name='Resource Utilization'>
      <style />
      <size maxheight='768' maxwidth='1366' minheight='768' minwidth='1366' />
      <zones>
        <zone h='100000' id='1' type-static='layout-basic' w='100000' x='0' y='0'>
          <zone h='98000' id='2' name='Resource Utilization Sheet' w='98000' x='1000' y='1000' />
        </zone>
      </zones>
    </dashboard>
  </dashboards>

  <windows>
    <window class='dashboard' name='Hospital Overview'>
      <active pane-at-bigness='true' />
    </window>
  </windows>
</workbook>
"""

def create_twbx():
    DASHBOARD_DIR.mkdir(parents=True, exist_ok=True)
    with open(TWB_PATH, "w", encoding="utf-8") as f:
        f.write(TWB_XML_CONTENT)
    print(f"Created {TWB_PATH}")
    
    with zipfile.ZipFile(TWBX_PATH, "w", compression=zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(TWB_PATH, arcname="medtrack_prototype.twb")
        if EXCEL_PATH.exists():
            zipf.write(EXCEL_PATH, arcname="Data/hospital_final_dataset.xlsx")
            
    print(f"Created packaged Tableau workbook {TWBX_PATH}")

if __name__ == "__main__":
    create_twbx()
