import {Component, OnInit, Input} from '@angular/core';
import {IncomingFiles, IncomingFolders} from 'app/interfaces/interfaces';
import {LocalStorageService} from 'app/service/storage';

@Component({
    selector: 'app-folder-new',
    templateUrl: './folder-new.component.html',
    styleUrls: ['./folder-new.component.css']
})
export class FolderNewComponent implements OnInit, Input {

    private applicationFiles: IncomingFiles;
    private applicationFolders: IncomingFolders;
    private state: string;
    private name: string;
    private incomingFiles: Array<number>;
    private incomingFolders: Array<number>;

    @Input() folderIndex: number;
    @Input() localStore: any;

    constructor(public localStorageService: LocalStorageService){

    }
    ngOnInit() {
        this.state = 'folder';
        this.initializingFunc();
    }

    public initializingFunc() {
        this.applicationFolders = this.localStorageService.folders;
        this.applicationFiles = this.localStorageService.files;
        this.name = this.applicationFolders[this.folderIndex].name;
        this.incomingFolders = this.applicationFolders[this.folderIndex].folders;
        this.incomingFiles = this.applicationFolders[this.folderIndex].files;
    }

    private addFile(displayFiles: Array<number>, files: IncomingFiles): void {
        this.localStorageService.addNewFile(displayFiles, files, this.folderIndex);
    }

    private addFolder(displayFolder: Array<number>, folders: IncomingFolders): void {
        this.localStorageService.addNewFolder(displayFolder, folders, this.folderIndex);
    }

    private childFileName(items): string {
        return this.applicationFiles[items].name;
    }
}
